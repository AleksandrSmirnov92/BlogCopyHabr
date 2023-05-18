import express, { Router } from "express";

const router: Router = express.Router();
const {
  GetQuestionsId,
} = require("../../dist/controllers/GetQuestionsIdController");
router.route("/:id").get(GetQuestionsId);
module.exports = router;
