import express from "express";
const Router = express.Router();
let { GetQuestionsId } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(GetQuestionsId);
module.exports = Router;
