import express, { Request, Response } from "express";
import { pool } from "./db.js";
const fileUpload = require("express-fileupload");
const app = express();
const signInRouter = require("../dist/Routes/SignInRouters");
const signUpRouter = require("../dist/Routes/SignUpRouters");
const getInfoAboutUserRouter = require("../dist/Routes/GetInfoUserRoutes");
const createQuestion = require("../dist/Routes/CreateQuestionRoutes");
const updateProfileRouter = require("../dist/Routes/UpdateProfileRoutes");
const updateAvatarRouter = require("../dist/Routes/UpdateAvatarRouters");
const tagInfoRouter = require("../dist/Routes/TagInfoRoutes.js");
const tagsInfoRouter = require("../dist/Routes/TagsInfoRouters.js");
const followersRouter = require("../dist/Routes/FollowersInfoRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
app.use(fileUpload());

app.use("/signIn", signInRouter);
// ----------------------------------------
app.use("/signUp", signUpRouter);
// ----------------------------------------
app.use("/getInformationAboutUser", getInfoAboutUserRouter);
// ----------------------------------------
app.use("/createQuestion", createQuestion);
// ----------------------------------------
app.use("/updateProfile", updateProfileRouter);
// ----------------------------------------
app.use("/updateAvatar", updateAvatarRouter);
// ----------------------------------------
app.use("/tag", tagInfoRouter);
// ----------------------------------------
app.use("/tags", tagsInfoRouter);
// ----------------------------------------
app.use("/followers", followersRouter);
// ----------------------------------------

app.get("/users", async (req, res) => {
  try {
    res.status(200).json({ message: "Сервер работает на порту 9999" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getInformationAboutUser = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [id]
    );
    res.status(200).json({
      message: "Вы получили информацию о зарегестрированом пользователе",
      body: getInformationAboutUser.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/tags", async (req, res) => {
  try {
    let getTags = await pool.query("SELECT * FROM tags");
    res.status(200).json({
      status: "SUCCESS",
      tags: getTags.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/questions", async (req, res) => {
  try {
    let getQuestions =
      await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
    join tags on questions.question_tags = tags_id;`);
    let getAnswers = await pool.query(`
    select * from answers
    `);
    // let countFollowersGit = await pool.query(
    //   "SELECT COUNT(*) FROM followers where git = $1",
    //   ["true"]
    // );
    res.status(200).json({
      message: "Вы получили информацию о всех вопросах",
      questions: getQuestions.rows,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/myQuestions", async (req, res) => {
  try {
    let { id } = req.body;
    let getQuestions =
      await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
    join tags on questions.question_tags = tags_id;`);
    let getFollower = await pool.query(
      `select followers.git,followers.javascript,followers.vue,followers.react,followers.html,followers.css from followers where followers_id_from_users = $1;`,
      [id]
    );
    let getAnswers = await pool.query(`
    select * from answers
    `);
    res.status(200).json({
      message: "Вы получили информацию о интересных мне вопросах вопросах",
      followers: getFollower.rows[0],
      questions: getQuestions.rows,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
// ----------------------------------------------
let getQuestions = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let userId;
    let getInfoUser;
    if (req.body.userId !== "Пользователь не зарегестрирован") {
      userId = req.body.userId;
      getInfoUser = await pool.query(
        `SELECT * from users JOIN about_user on about_user.user_id_from_users = $1 WHERE users.user_id = $1`,
        [userId]
      );
    } else {
      getInfoUser = "";
    }
    let getAnswers = await pool.query(
      `SELECT answers.answers,users.email,users.nickname,about_user.fullname,about_user.lastname,about_user.img,about_user.user_id_from_users from answers as answers JOIN users on users.user_id = answers.responce_userid JOIN about_user on about_user.user_id_from_users = answers.responce_userid WHERE answers.question_id_from_questions = $1 ORDER BY answer_id`,
      [id]
    );
    let getQuestionInfo = await pool.query(
      `SELECT * FROM questions as q JOIN tags on tags_id = q.question_tags JOIN users on users.user_id = q.user_id JOIN about_user on about_user.user_id_from_users = q.user_id WHERE q.questions_id = $1 `,
      [id]
    );
    res.status(200).json({
      message: "Вы получили информацию о вопросе",
      questionInfo: getQuestionInfo.rows[0],
      answers: getAnswers.rows,
      userInfo: getInfoUser !== "" ? getInfoUser.rows[0] : "",
    });
  } catch (err) {
    console.log(err);
  }
};
app.route("/question/:id").post(getQuestions);
// --------------------------------------
let getAnswers = async (req: Request, res: Response) => {
  let { answer, questionId, questionUserId, userId } = req.body;
  try {
    let addInformationInAnswers = await pool.query(
      `INSERT INTO answers (question_id_from_questions,user_id_from_users,answers,responce_userid) VALUES($1,$2,$3,$4)`,
      [questionId, questionUserId, answer, userId]
    );
    let getAnswers = await pool.query(
      `SELECT answers.answers,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id ORDER BY answer_id`
    );
    console.log(getAnswers.rows);
    res.status(200).json({
      message: "Вы ответили",
      answer: getAnswers.rows.at(-1),
    });
  } catch (err) {
    console.log(err);
  }
};
app.route("/answers").post(getAnswers);
// -----------------------------------------------
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
