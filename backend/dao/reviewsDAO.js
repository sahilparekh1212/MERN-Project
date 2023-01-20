import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        };

        try {
            reviews = await conn.db(process.env.DB_TEMP).collection("reviews");
        } catch (e) {
            console.log(`Error in reviewsDAO > injectDB() > error=${e}`)
        }
    }

    static async addReview(restaurantId, userInfo, review, date) {
        try {
            const reviewDoc = {
                name: userInfo.name,
                user_id: userInfo._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }
            console.log(`addReview() > addReview=${reviewDoc}`);
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.log(`Unable to addReview review:${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            })
            return deleteResponse;
        } catch (e) {
            console.log(`Unable to delete review:${e}`);
            return { error: e };
        }
    }
}