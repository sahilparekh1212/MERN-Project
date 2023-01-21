import TeamsDAO from "../dao/teamsDAO.js"

export default class TeamsController {
    static async apiPostTeam(req, res, next) {
        try {
            const response = await TeamsDAO.postTeam(req.body);

            var { error } = response;

            if (error) {
                res.status(400).json({ error: "apiPostTeam 500 a error=", error });
            };
            console.log("apiPostTeam > response=", response);
            res.status(200).json({ result: "success", id: response.insertedId });
        } catch (e) {
            console.log("apiPostTeam 500 b > e=", e);
            res.status(500).json({ error: "500 of apiPostTeam" });
        }
    }

    static async apiGetTeams(req, res, next) {
        const teamsPerPage = req.query.teamsPerPage ? parseInt(req.query.teamsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.teamName) {
            // http://localhost:5000/api/v1/teams?teamName=a
            filters.teamName = req.query.teamName
        } else if (req.query.gameName) {
            // http://localhost:5000/api/v1/teams?gameName=bGame
            filters.gameName = req.query.gameName
        } else if (req.query.emailId) {
            // http://localhost:5000/api/v1/teams?emailId=a@team.team
            filters.emailId = req.query.emailId
        }

        const { teamsList, totalNumTeams } = await TeamsDAO.getTeams({
            filters,
            page,
            teamsPerPage
        })

        let response = {
            teams: teamsList,
            page: page,
            filters: filters,
            entries_per_page: teamsPerPage,
            total_results: totalNumTeams,
        }
        console.log("apiGetTeams > response=", response);
        res.status(200).json(response);
    }

    static async apiGetTeamById(req, res, next) {
        try {
            let id = req.params.id || {};
            let team = await TeamsDAO.getTeamById(id);

            if (!team) {
                res.status(404).json({ error: "404 apiGetTeams" });
                return;
            }
            console.log("apiGetTeamById > response=", response);
            res.status(200).json({ team: team });
        } catch (e) {
            console.log("apiGetTeams > e=", e);
            res.status(500).json({ error: "500 apiGetTeams" });
        }
    }

    static async apiGetTeamsCities(req, res, next) {
        try {
            let cities = await TeamsDAO.getTeamsCities();

            if (!cities) {
                res.status(404).json({ error: "404 apiGetTeamsCities" });
                return;
            }
            console.log("apiGetTeamsCities > response=", response);
            res.status(200).json({ result: "success", cities: cities });
        } catch (e) {
            console.log(`apiGetTeamsCities > e= ${e}`);
            res.status(500).json({ error: "500 apiGetTeamsCities" });
        }
    }

    static async apiUpdateTeam(req, res, next) {
        try {
            const teamId = req.body.id;
            const teamName = req.body.teamName;
            const gameName = req.body.gameName;
            const emailId = req.body.emailId;
            const city = req.body.city;

            const response = await TeamsDAO.updateTeam(
                teamId, teamName, gameName, emailId, city
            );

            var { error } = response;
            if (error) {
                res.status(400).json({ error: "400 apiUpdateTeam" });
            }

            if (response.modifiedCount === 0) {
                throw new Error(
                    `Unable to update team response=${response}`
                )
            }
            console.log("apiUpdateTeam > response=", response);
            res.status(200).json({ result: "success" })
        } catch (e) {
            console.log("apiUpdateTeam > error=", e);
            res.status(501).json({ error: "500 apiUpdateTeam" });
        }
    }

    static async apiDeleteTeam(req, res, next) {
        try {
            const response = await TeamsDAO.deleteTeam(req.body.id);

            var { error } = response;

            if (error) {
                res.status(400).json({ error: "400 apiDeleteTeam" });
            }
            console.log("apiDeleteTeam > response=", response);
            if (response.deletedCount && response.deletedCount === 1) {
                res.status(200).json({ result: "success" });
            } else {
                res.status(404).json({ error: "team not found" });
            }
        } catch (e) {
            res.status(500).json({ error: "500 apiDeleteTeam" })
        }
    }

    static async apiKeepFirstX(req, res, next) {
        try {
            const response = await TeamsDAO.keepFirstX(parseInt(req.query.keepFirstX));
            console.log("apiKeepFirstX > response=", response);
            res.status(200).json({ result: "success" });
        } catch (e) {
            console.log("apiKeepFirstX > e=", e);
            res.status(500).json({ error: "500 apiKeepFirstX" })
        }
    }
}