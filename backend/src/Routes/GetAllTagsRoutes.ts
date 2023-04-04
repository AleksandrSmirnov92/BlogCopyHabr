import express from "express";
const { getAllTags } = require("../controllers/GetAllTagsController");
let Route = express.Router();
Route.route("/").get(getAllTags);
module.exports = Route;
