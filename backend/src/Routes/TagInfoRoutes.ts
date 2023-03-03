import express from "express";
const Router = express.Router();
let { tagInfo } = require("../controllers/TagInfoController");

Router.route("/:id").get(tagInfo);
module.exports = Router;
