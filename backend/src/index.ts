import express from "express";
import { pool } from "./db.js";
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    // optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
// Routes
// get allusers

app.post("/signUp", async (req, res) => {
  console.log(req.cookies);
  try {
    const { email, nickName, password } = req.body;
    console.log(email, nickName, password);
    const newUser = await pool.query(
      "INSERT INTO users (email,nickname,password) VALUES($1, $2, $3) RETURNING * ",
      [email, nickName, password]
    );
    return (
      res
        .status(200)
        // .cookie("nickname", `${nickName}`, { maxAge: 60 * 60 * 24 })
        .json({
          status: "SUCCESS",
          message: nickName,
        })
    );
  } catch (err: any) {
    return res.status(406).json({
      error: err.detail,
    });
  }
});

app.post("/signIn", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: "SignIn обьект получен" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/users", async (req, res) => {
  try {
    res.status(200).json({ message: "Сервер работает на порту 9999" });
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
// get information about questions
const port = process.env.PORT || "9999";
app.listen(port, () => {
  console.log("Server has started on port: 9999");
});
