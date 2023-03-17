"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Router = express_1["default"].Router();
var getMyFeed = require("../controllers/GetMyFeedController").getMyFeed;
Router.post("/", getMyFeed);
module.exports = Router;
