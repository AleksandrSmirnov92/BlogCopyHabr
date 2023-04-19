import express, { Router } from "express";
let { GetQuestionsId } = require("../controllers/GetQuestionsIdController");
const router: Router = express.Router();
router.route("/:id").get(GetQuestionsId);
module.exports = router;
