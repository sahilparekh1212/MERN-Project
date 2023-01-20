import express from "express"
import TeamsController from "./teams.controller.js"

const router = express.Router();
//C
router.route("/addTeam").post(TeamsController.apiPostTeam);
//R
router.route("/").get(TeamsController.apiGetTeams);
router.route("/id/:id").get(TeamsController.apiGetTeamById);
router.route("/cities").get(TeamsController.apiGetTeamsCities);
//U
router.route("/updateTeam").put(TeamsController.apiUpdateTeam);
//D
router.route("/deleteTeam").delete(TeamsController.apiDeleteTeam);
router.route("/").delete(TeamsController.apiKeepFirstX);

export default router;