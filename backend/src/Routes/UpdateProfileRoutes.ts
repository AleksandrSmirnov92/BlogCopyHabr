import express from "express";
let { updateProfile } = require("../controllers/UpdateProfileController");
const router = express.Router();
router.route("/").put(updateProfile);
module.exports = router;
