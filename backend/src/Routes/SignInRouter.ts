import express, { Router } from "express";

const { signIn } = require("../../dist/controllers/SignInController");
const router: Router = express.Router();

router.route("/").post(signIn);
module.exports = router;
