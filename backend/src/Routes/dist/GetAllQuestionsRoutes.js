"use strict";
exports.__esModule = true;
var express_1 = require("express");
var _a = require("../controllers/GetAllQuestionsController"), getAllQuestions = _a.getAllQuestions, getAllQuestionsId = _a.getAllQuestionsId;
var Router = express_1["default"].Router();
Router.route("/").get(getAllQuestions);
Router.route("/:id").get(getAllQuestionsId);
module.exports = Router;
