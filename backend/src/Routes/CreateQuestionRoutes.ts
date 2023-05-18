import express, { Router } from "express";
const router: Router = express.Router();
const {
  createQuestion,
} = require("../../dist/controllers/CreateQuestionController");
router.route("/").post(createQuestion);
module.exports = router;
