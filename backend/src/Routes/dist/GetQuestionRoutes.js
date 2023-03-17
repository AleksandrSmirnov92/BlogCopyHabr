"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Router = express_1["default"].Router();
var getQuestions = require("../controllers/GetQuestionController").getQuestions;
Router.route("/:id").post(getQuestions);
module.exports = Router;
