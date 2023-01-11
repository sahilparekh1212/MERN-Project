import express from "express"

const router = express.Router();

// http://localhost:5000/api/v1/teams
router.route("/").get((req,res)=>{
    res.send("hello world");
});

export default router;