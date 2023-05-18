import express, { Router } from "express";
let {
  getAnswers,
  getAnswersId,
} = require("../controllers/GetAnswerController");
const router: Router = express.Router();
router.route("/").post(getAnswers);
router.route("/:id").get(getAnswersId);
module.exports = router;
