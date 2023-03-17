import express, { Router } from "express";
let { getAnswers } = require("../controllers/GetAnswerController");
const router: Router = express.Router();
router.route("/").post(getAnswers);
module.exports = router;
