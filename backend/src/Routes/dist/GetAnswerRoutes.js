"use strict";
exports.__esModule = true;
var express_1 = require("express");
var getAnswers = require("../controllers/GetAnswerController").getAnswers;
var router = express_1["default"].Router();
router.route("/").post(getAnswers);
module.exports = router;
