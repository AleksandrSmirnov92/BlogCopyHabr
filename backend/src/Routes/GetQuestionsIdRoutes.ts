import express from "express";
const Router = express.Router();
let { QuestionsId } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(QuestionsId);
module.exports = Router;
