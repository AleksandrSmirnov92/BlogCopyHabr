"use strict";
exports.__esModule = true;
var express_1 = require("express");
var getAllTags = require("../controllers/LiveSearchTagsController").getAllTags;
var Route = express_1["default"].Router();
Route.route("/").get(getAllTags);
module.exports = Route;
