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
app.get("/tag/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let descriptionTag = await pool.query(
      "SELECT * FROM tags WHERE tags_id = $1",
      [id]
    );
    console.log(descriptionTag.rows[0].name_tag);
    let countFollowersJavaScript = await pool.query(
      `SELECT COUNT(*) FROM followers where ${descriptionTag.rows[0].name_tag} = $1`,
      ["true"]
    );
    let countFollowersHTML = await pool.query(
      "SELECT COUNT(*) FROM followers where html = $1",
      ["true"]
    );
    let countFollowersCSS = await pool.query(
      "SELECT COUNT(*) FROM followers where css = $1",
      ["true"]
    );
    let countFollowersReact = await pool.query(
      "SELECT COUNT(*) FROM followers where react = $1",
      ["true"]
    );
    let countFollowersVue = await pool.query(
      "SELECT COUNT(*) FROM followers where vue = $1",
      ["true"]
    );
    let countFollowersGit = await pool.query(
      "SELECT COUNT(*) FROM followers where git = $1",
      ["true"]
    );

    res.status(200).json({
      message: "Вы получили информацию о тэге",
      body: descriptionTag.rows[0],
      countFollowers: {
        JavaScript: countFollowersJavaScript.rows[0],
        HTML: countFollowersHTML.rows[0],
        CSS: countFollowersCSS.rows[0],
        React: countFollowersReact.rows[0],
        Vue: countFollowersVue.rows[0],
        Git: countFollowersGit.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/tags/:id", async (req, res) => {
  let { id } = req.params;
  console.log(req.params);
  try {
    let getTags;
    if (id !== "null") {
      getTags = await pool.query(
        `SELECT * FROM tags join followers on followers_id_from_users = $1`,
        [id]
      );
    } else {
      getTags = await pool.query(`SELECT * FROM tags`);
    }
    let countFollowersJavaScript = await pool.query(
      "SELECT COUNT(*) FROM followers where javascript = $1",
      ["true"]
    );
    let countFollowersHTML = await pool.query(
      "SELECT COUNT(*) FROM followers where html = $1",
      ["true"]
    );
    let countFollowersCSS = await pool.query(
      "SELECT COUNT(*) FROM followers where css = $1",
      ["true"]
    );
    let countFollowersReact = await pool.query(
      "SELECT COUNT(*) FROM followers where react = $1",
      ["true"]
    );
    let countFollowersVue = await pool.query(
      "SELECT COUNT(*) FROM followers where vue = $1",
      ["true"]
    );
    let countFollowersGit = await pool.query(
      "SELECT COUNT(*) FROM followers where git = $1",
      ["true"]
    );

    res.status(200).json({
      message: "Вы получили информацию о всех тегах",
      tags: getTags.rows,
      countFollowers: {
        JavaScript: countFollowersJavaScript.rows[0].count,
        HTML: countFollowersHTML.rows[0].count,
        CSS: countFollowersCSS.rows[0].count,
        React: countFollowersReact.rows[0].count,
        Vue: countFollowersVue.rows[0].count,
        Git: countFollowersGit.rows[0].count,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/followers/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { nameTag } = req.body;

    let getFollower = await pool.query(
      `SELECT ${nameTag.toLowerCase()} FROM followers WHERE followers_id_from_users = $1 `,
      [id]
    );
    let updateFollower = await pool.query(
      `UPDATE followers SET ${nameTag.toLowerCase()} = $1 WHERE followers_id_from_users = $2`,
      [!getFollower.rows[0][nameTag.toLowerCase()], id]
    );
    let getTags = await pool.query(
      `SELECT * FROM tags join followers on followers_id_from_users = $1`,
      [id]
    );
    let countFollowersJavaScript = await pool.query(
      "SELECT COUNT(*) FROM followers where javascript = $1",
      ["true"]
    );
    let countFollowersHTML = await pool.query(
      "SELECT COUNT(*) FROM followers where html = $1",
      ["true"]
    );
    let countFollowersCSS = await pool.query(
      "SELECT COUNT(*) FROM followers where css = $1",
      ["true"]
    );
    let countFollowersReact = await pool.query(
      "SELECT COUNT(*) FROM followers where react = $1",
      ["true"]
    );
    let countFollowersVue = await pool.query(
      "SELECT COUNT(*) FROM followers where vue = $1",
      ["true"]
    );
    let countFollowersGit = await pool.query(
      "SELECT COUNT(*) FROM followers where git = $1",
      ["true"]
    );
    res.status(200).json({
      message: "Вы получили информацию о всех тегах",
      getSubscribe: getTags.rows,
      countFollowers: {
        JavaScript: countFollowersJavaScript.rows[0].count,
        HTML: countFollowersHTML.rows[0].count,
        CSS: countFollowersCSS.rows[0].count,
        React: countFollowersReact.rows[0].count,
        Vue: countFollowersVue.rows[0].count,
        Git: countFollowersGit.rows[0].count,
      },
    });
    console.log(getFollower.rows[0][nameTag.toLowerCase()]);
    console.log(!getFollower.rows[0][nameTag.toLowerCase()]);
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
app.post("/question/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let getMyInfo = await pool.query(
      `SELECT img FROM about_user WHERE user_id_from_users = $1`,
      [userId]
    );
    let getQuestion = await pool.query(
      `SELECT * FROM questions WHERE  questions_id = $1`,
      [id]
    );
    let usersInfo = await pool.query(
      `SELECT * FROM about_user JOIN users on about_user.user_id_from_users = $1 `,
      [getQuestion.rows[0].user_id]
    );
    let getTags = await pool.query(`SELECT * FROM tags WHERE tags_id = $1`, [
      getQuestion.rows[0].question_tags,
    ]);
    let getAnswers = await pool.query(
      `SELECT answers.answers,p2.user_id_from_users,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id where answers.question_id_from_questions = $1`,
      [id]
    );

    res.status(200).json({
      message: "Вы получили информацию о вопросе",
      question: getQuestion.rows[0],
      userInfo: usersInfo.rows[0],
      tagsInfo: getTags.rows[0],
      myImg: getMyInfo.rows[0].img,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/answers", async (req, res) => {
  let { answer, questionId, questionUserId, userId } = req.body;
  try {
    let addInformationInAnswers = await pool.query(
      `INSERT INTO answers (question_id_from_questions,user_id_from_users,answers,responce_userid) VALUES($1,$2,$3,$4)`,
      [questionId, questionUserId, answer, userId]
    );
    let getAnswers = await pool.query(
      `SELECT answers.answers,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id`
    );
    res.status(200).json({
      message: "Вы ответили",
      answer: getAnswers.rows.at(-1),
    });
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

module.exports = app;
