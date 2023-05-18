import express from "express";
const router = express.Router();
const { signUp } = require("../controllers/SignUpController");
router.route("/").post(signUp);
module.exports = router;
