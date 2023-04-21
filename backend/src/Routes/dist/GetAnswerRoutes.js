"use strict";
exports.__esModule = true;
var express_1 = require("express");
var _a = require("../controllers/GetAnswerController"), getAnswers = _a.getAnswers, getAnswersId = _a.getAnswersId;
var router = express_1["default"].Router();
router.route("/").post(getAnswers);
router.route("/:id").get(getAnswersId);
module.exports = router;
