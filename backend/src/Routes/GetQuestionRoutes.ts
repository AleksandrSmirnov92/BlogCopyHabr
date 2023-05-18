import express from "express";
const Router = express.Router();
let { getQuestions } = require("../controllers/GetQuestionController");
Router.route("/:id").post(getQuestions);
module.exports = Router;
