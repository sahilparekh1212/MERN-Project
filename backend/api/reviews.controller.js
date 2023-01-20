import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;

            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                restaurantId, userInfo, review, date
            );

            var { error } = reviewResponse;

            if (error) {
                res.status(400).json({ error: "apiPostReview 500 a error=", error });
            };

            console.log("apiPostReview success reviewResponse=", reviewResponse);
            res.json({ status: "success" });
        } catch (e) {
            console.log("apiPostReview 500 b > e=", e);
            res.status(500).json({ error: "500 of apiPostReview" });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            );

            var { error } = reviewResponse;

            if (error) {
                res.status(400).json({ error: "updateReview 400 a > error=", error });
            };

            if (reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review - user may not be the original poster")
            };

            console.log("updateReview success reviewResponse=", reviewResponse);
            res.json({ status: "updateReview success" });
        } catch (e) {
            console.log("updateReview 400 b > e=", e);
            res.status(400).json({ error: "updateReview 400 b" });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id;
            const userId = req.body.user_id;

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId, userId
            );

            var { error } = reviewResponse;

            if (error) {
                res.status(400).json({ error: "apiDeleteReview 400 a error=", error });
            };

            console.log("apiDeleteReview success reviewResponse=", reviewResponse);
            res.json({ status: "apiDeleteReview success" });
        } catch (e) {
            console.log("apiDeleteReview 400 b > e=", e);
            res.status(500).json({ error: "apiDeleteReview error" });
        }
    }
}