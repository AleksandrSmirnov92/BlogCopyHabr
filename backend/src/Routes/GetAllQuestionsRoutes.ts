import express from "express";
const {
  getAllQuestions,
  getAllQuestionsId,
} = require("../controllers/GetAllQuestionsController");
let Router = express.Router();
Router.route("/").get(getAllQuestions);
Router.route("/:id").get(getAllQuestionsId);
module.exports = Router;
