"use strict";
exports.__esModule = true;
var express_1 = require("express");
var getAllQuestions = require("../controllers/GetAllQuestionsController").getAllQuestions;
var Router = express_1["default"].Router();
Router.route("/").get(getAllQuestions);
module.exports = Router;
