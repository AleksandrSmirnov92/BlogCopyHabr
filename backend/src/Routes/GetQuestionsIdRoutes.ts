import express from "express";
const Router = express.Router();
let { getQuestions } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(getQuestions);
module.exports = Router;
