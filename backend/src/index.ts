import express from "express";
import { pool } from "./db.js";
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");
app.use(express.json());
app.use(cors());
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
    const newInformationAboutUser = await pool.query(
      "INSERT INTO about_user (user_id_from_users) VALUES($1)",
      [newUser.rows[0].user_id]
    );
    return res.status(200).json({
      status: "SUCCESS",
      message: nickName,
      userId: newUser.rows[0].user_id,
    });
  } catch (err: any) {
    return res.status(406).json({
      error: err.detail,
    });
  }
});

app.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    if (!getUser.rows.length) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Пользователь не существует" });
    }
    res.status(200).json({ status: "SUCCESS", user: getUser.rows[0] });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.post("/createQuestions", async (req, res) => {
  try {
    const { questionTitle, questionTags, questionDetails, userId } = req.body;
    console.log(questionTitle, questionTags, questionDetails, userId);
    // let idTags = await pool.query("SELECT * FROM tags WHERE name_tag = $1", [
    //   questionTags,
    // ]);
    // if (!idTags.rows[0]) {
    //   const createNewTag = await pool.query(
    //     "INSERT INTO tags (name_tag) VALUES($1)",
    //     [questionTags]
    //   );
    //   idTags = await pool.query("SELECT * FROM tags WHERE name_tag = $1", [
    //     questionTags,
    //   ]);
    // }
    // let createNewQustions = await pool.query(
    //   "INSERT INTO questions (user_id, question_title,question_tags,question_details) VALUES($1,$2,$3,$4)",
    //   [userId, questionTitle, idTags.rows[0].tags_id, questionDetails]
    // );
    res.status(200).json({ message: "Сервер работает на порту 9999" });
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
