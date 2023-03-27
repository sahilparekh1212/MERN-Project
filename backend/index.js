import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import TeamsDAO from "./dao/teamsDAO.js"

dotenv.config();

const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

mongoClient.connect(
    process.env.DB_URI,
    {
        maxPoolSize: 50,
        maxIdleTimeMS: 2500
    }).catch(error => {
        console.log("\x1b[36m%s\x1b[0m", "\nError encountered while connecting to MERN DB > error =\n", error);
        process.exit(1);
    }).then(async client => {
        await TeamsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    }
    );