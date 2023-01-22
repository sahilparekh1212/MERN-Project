import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let teams;

export default class TeamsDAO {
    static async injectDB(conn) {
        if (teams) {
            return
        }
        try {
            teams = await conn.db(process.env.DB_TEMP).collection("teams");
        } catch (err) {
            console.log("Error in retrieving data from DB_TEMP > err=", err);
        }
    }

    static async postTeam(info) {
        try {
            const reviewDoc = {
                teamName: info.teamName,
                gameName: info.gameName,
                emailId: info.emailId,
                city: info.city
            }
            return await teams.insertOne(reviewDoc);
        } catch (e) {
            console.log(`Unable to postTeam e:${e}`);
            return { error: e };
        }
    }

    static async getTeams({
        filters = null,
        page = 0,
        teamsPage = 20
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                //DB should have an index with name as "name" for it to work
                query = { $text: { $search: filters["name"] } }
            } else if ("teamName" in filters) {
                query = { "teamName": { $eq: filters["teamName"] } }
            } else if ("gameName" in filters) {
                query = { "gameName": { $eq: filters["gameName"] } }
            } else if ("emailId" in filters) {
                query = { "emailId": { $eq: filters["emailId"] } }
            }
        }

        let cursor;

        try {
            cursor = await teams.find(query);
        } catch (err) {
            console.log(`Cannot find cursor for query= ${query} , cursor=${cursor}`);
            return { teamsList: [], totalNumTeams: 0 };
        }

        const displayCursor = cursor.limit(teamsPage).skip(teamsPage * page);

        try {
            const teamsList = await displayCursor.toArray();
            const totalNumTeams = await teams.countDocuments(query);
            return { teamsList, totalNumTeams };
        } catch (e) {
            console.log(`Cannot count displayCursor= ${displayCursor}`);
            return { teamsList: [], totalNumTeams: 0 };
        }

    }

    static async getTeamById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$id", "$$id"]
                                    }
                                }
                            }
                        ],
                        as: "reviews"
                    }
                },
                {
                    $addFields: {
                        reviews: "$reviews"
                    }
                }
            ];
            return await teams.aggregate(pipeline).next();
        } catch (e) {
            console.log(`error in getTeamById`)
        }
    }

    static async getTeamsCities() {
        let cities = [];
        try {
            cities = await teams.distinct("city");
            return cities;
        } catch (e) {
            console.error(`Unable to get cities, ${e}`);
        }
    }

    static async updateTeam(teamId, teamName, gameName, emailId, city) {
        try {
            const response = await teams.updateOne(
                { _id: ObjectId(teamId) },
                { $set: { teamName: teamName, gameName: gameName, emailId: emailId, city: city } }
            );
            return response;
        } catch (e) {
            console.error(`Unable to update team > e= ${e}`)
            return { error: e }
        }
    }

    static async deleteTeam(teamId) {
        try {
            console.log("del > =", teamId);
            const response = await teams.deleteOne({
                _id: ObjectId(teamId),
            });

            return response;
        } catch (e) {
            console.error(`Unable to delete team > e= ${e}`);
            return { error: e }
        }
    }

    static async keepFirstX(keep) {
        let refTime = new Date().getMilliseconds();
        try {
            this.getTeams().then((res) => {
                let copyArr = res.teamsList;
                copyArr.forEach(async (element, index) => {
                    var response;
                    if (index >= parseInt(keep)) {
                        response = await teams.deleteOne({
                            _id: element._id
                        });
                        console.log("Deleted index=", index, "response=", response, "timeTaken=", (new Date().getMilliseconds() - refTime));
                    }
                });
            });
        } catch (e) {
            console.log("Error in keepFirstX=", e);
            return { error: e };
        }
    }
}