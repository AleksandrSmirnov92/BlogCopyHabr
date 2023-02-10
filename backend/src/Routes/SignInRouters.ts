import express, { Router } from "express";
const router: Router = express.Router();
const { signIn } = require("../../dist/controllers/SignInController");
router.route("/").post(signIn);
module.exports = router;
