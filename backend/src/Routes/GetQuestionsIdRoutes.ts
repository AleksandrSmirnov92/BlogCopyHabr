import express from "express";
const Router = express.Router();
let { questionsId } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(questionsId);
module.exports = Router;
