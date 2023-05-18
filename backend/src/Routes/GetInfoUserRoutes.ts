import express from "express";
const Router = express.Router();
const {
  getAllInfoAboutUser,
  getInfoAboutUser,
} = require("../controllers/GetInfoUserController");
Router.route("/").get(getAllInfoAboutUser);
Router.route("/:id").get(getInfoAboutUser);

module.exports = Router;
