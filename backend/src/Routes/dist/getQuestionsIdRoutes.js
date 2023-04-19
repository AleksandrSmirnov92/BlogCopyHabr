"use strict";
exports.__esModule = true;
var express_1 = require("express");
var GetQuestionsId = require("../controllers/GetQuestionsIdController").GetQuestionsId;
var router = express_1["default"].Router();
router.route("/:id").get(GetQuestionsId);
module.exports = router;
