import express from "express";
const { getAllQuestions } = require("../controllers/GetAllQuestionsController");
let Router = express.Router();
Router.route("/").get(getAllQuestions);
module.exports = Router;
