import express from "express";
const Router = express.Router();
let { getQuestionsId } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(getQuestionsId);
module.exports = Router;
