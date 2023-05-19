<<<<<<< HEAD
import express, { Router } from "express";
let { GetQuestionsId } = require("../controllers/GetQuestionsIdController");
const router: Router = express.Router();
router.route("/:id").get(GetQuestionsId);
module.exports = router;
=======
import express from "express";
const Router = express.Router();
let { questionsId } = require("../controllers/GetQuestionsIdController");
Router.route("/:id").get(questionsId);
module.exports = Router;
>>>>>>> fe9ca836d143b5ada9a2ef432ba3eeba4dcc9fe0
