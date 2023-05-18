import express from "express";
const { getInfoTags } = require("../controllers/TagsInfoController");
const Router = express.Router();
Router.route("/:id").get(getInfoTags);
module.exports = Router;
