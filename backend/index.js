import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config();

const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

mongoClient.connect(
    process.env.DB_URI,
    {
        maxPoolSize: 50,
        maxIdleTimeMS: 2500
    }).catch(error => {
        console.log(error.stack);
        process.exit(1);
    }).then(async client => {
        await RestaurantsDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    }
    );