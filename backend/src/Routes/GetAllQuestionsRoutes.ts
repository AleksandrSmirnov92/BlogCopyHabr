import express, { Router } from "express";
const router: Router = express.Router();
const {
  getAllQuestions,
  getAllQuestionsId,
} = require("../controllers/GetAllQuestionsController");

// router.route("/").post(getAllQuestions);
router.route("/").get(getAllQuestions);
router.route("/:id").get(getAllQuestionsId);
module.exports = router;
