import express from "express";
let Routers = express.Router();
const { getInfoFollowers } = require("../controllers/FollowersInfoController");
Routers.route("/:id").post(getInfoFollowers);
module.exports = Routers;
