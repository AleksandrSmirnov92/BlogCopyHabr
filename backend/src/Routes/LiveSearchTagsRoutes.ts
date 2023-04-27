import express from "express";
const { getAllTags } = require("../controllers/LiveSearchTagsController");
let Route = express.Router();
Route.route("/").post(getAllTags);
module.exports = Route;
