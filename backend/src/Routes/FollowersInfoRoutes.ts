import express from "express";
const { getInfoFollowers } = require("../controllers/FollowersInfoController");
let router = express.Router();
router.route("/:id").post(getInfoFollowers);
exports.modules = router;
