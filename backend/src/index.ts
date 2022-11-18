import express from "express";
// const pool = require("./db.ts");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
// Routes
// get allusers
app.get("/users", async (req, res) => {
  try {
    res.status(200).json({ message: "Сервер работает на порту 5000" });
  } catch (err) {
    console.log(err);
  }
});
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});
// get information user
// get information about question
app.listen("5000", () => {
  console.log("Server has started on port: 5000");
});
