import express from "express"
import RestaurantsController from "./restaurants.controller.js"

const router = express.Router();

router.route("/").get((RestaurantsController.apiGetRestaurants));

// http://localhost:5000/api/v1/teams
// router.route("/").get((req,res)=>{
//     res.send("hello world");
// });

export default router;