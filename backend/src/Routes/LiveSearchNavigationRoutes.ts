import express from "express";
const { getAllInfo } = require("../controllers/LiveSearchNavigationController");
const Router = express.Router();
Router.route("/").post(getAllInfo);
module.exports = Router;
