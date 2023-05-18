import express from "express";
const Router = express.Router();
const { getMyFeed } = require("../controllers/GetMyFeedController");
Router.post("/", getMyFeed);
module.exports = Router;
