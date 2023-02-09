import express, { Request, Response } from "express";
import { pool } from "./db.js";
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
app.use(fileUpload());

interface SignIn {
  status: string;
  message?: string;
  user?: {
    user_id: string;
    nickname: string;
  };
}
const signIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<SignIn>
) => {
  try {
    const { email, password } = req.body;
    const getUser = await pool.query(
      `SELECT users.user_id,users.nickname FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    if (!getUser.rows.length) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Пользователь не существует" });
    }
    return res.status(200).json({ status: "SUCCESS", user: getUser.rows[0] });
  } catch (err: any) {
    console.log(err.message);
  }
};
app.route("/signIn").post(signIn);
// ----------------------------------------
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
      "INSERT INTO about_user (user_id_from_users,img,fullname,lastname,contacts,linktocontacts,briefly_about_yourself,informattion_about_user,country,region,town) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        newUser.rows[0].user_id,
        "",
        "",
        "",
        "Контакты",
        "",
        "",
        "",
        "Страна",
        "Регион",
        "Город",
      ]
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

app.post("/createQuestion", async (req, res) => {
  try {
    const { questionTitle, questionTags, questionDetails, userId } = req.body;
    console.log(questionTitle, questionTags, questionDetails, userId);
    let idTags = await pool.query("SELECT * FROM tags WHERE name_tag = $1", [
      questionTags,
    ]);

    if (!idTags.rows[0]) {
      return res.status(404).json({
        status: "ERROR",
        message: "Не правильно заполненны поля",
      });
    }
    let date = new Date();
    let date2 = Date.now();
    let getDate = await pool.query(`SELECT NOW()`);

    let createNewQustions = await pool.query(
      "INSERT INTO questions (user_id, question_title,question_tags,question_details,date_of_creation) VALUES($1,$2,$3,$4,$5)",
      [
        userId,
        questionTitle,
        idTags.rows[0].tags_id,
        questionDetails,
        getDate.rows[0].now,
      ]
    );
    let getIdQustions = await pool.query(
      "SELECT * FROM questions WHERE user_id = $1 AND question_title = $2 AND question_tags = $3 AND question_details = $4",
      [userId, questionTitle, idTags.rows[0].tags_id, questionDetails]
    );

    let addInQuestionAndTags = await pool.query(
      "INSERT INTO question_and_tags (user_id_from_users, tag_id_from_tags ) VALUES($1,$2)",
      [userId, idTags.rows[0].tags_id]
    );
    let IdQustions = await pool.query(
      "SELECT * FROM questions WHERE user_id = $1",
      [userId]
    );
    // console.log(IdQustions.rows[0].questions_id);
    // let addUserIdInAnswers = await pool.query(
    //   "INSERT INTO answers (question_id_from_questions, user_id_from_users) VALUES($1,$2)",
    //   [IdQustions.rows[0].questions_id, userId]
    // );
    return res.status(200).json({
      status: "SUCCESS",
      questions: {
        questionTitle: questionTitle,
        questionTags: questionTags,
        questionDetails: questionDetails,
        userId: userId,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/upload/:id", async (req: any, res) => {
  let { id } = req.params;
  const file = req.files.file;
  let addInformationInAboutUser = await pool.query(
    `UPDATE about_user SET img = $1 WHERE user_id_from_users = $2`,
    [`/uploads/${file.name}`, id]
  );
  const pathUpload = path.resolve(__dirname, "../../Frontend/public/uploads");
  if (!req.files) {
    return res.status(404).json({
      message: "Загрузите фотографию",
    });
  }
  if (fs.existsSync(`${pathUpload}/${file.name}`)) {
    return res.status(200).json({
      filePath: `/uploads/${file.name}`,
    });
  }
  file.mv(
    `${pathUpload}/${file.name}`,

    (err: any) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
      return res.status(200).json({
        filePath: `/uploads/${file.name}`,
      });
    }
  );
});
app.delete("/deleteImg/:id", async (req, res) => {
  let { id } = req.params;
  let addInformationInAboutUser = await pool.query(
    `UPDATE about_user SET img = $1 WHERE user_id_from_users = $2`,
    [``, id]
  );
  let filePath = req.body.path;
  const pathUpload = path.resolve(
    __dirname,
    `../../Frontend/public/${filePath}`
  );
  fs.unlink(pathUpload, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        filePath: ``,
      });
    }
  });
  console.log(pathUpload);
});

app.post("/settingsProfile", async (req, res) => {
  let {
    id,
    img,
    fullName,
    lastName,
    contacts,
    linkToContacts,
    briefly_about_yourself,
    informattion_about_user,
    country,
    region,
    town,
  } = req.body;

  try {
    let addInformationInAboutUser = await pool.query(
      `UPDATE about_user SET fullname = $1,lastname = $2,contacts = $3,linktocontacts = $4,briefly_about_yourself = $5,informattion_about_user = $6,country = $7,region = $8,town = $9 WHERE user_id_from_users = $10`,
      [
        fullName,
        lastName,
        contacts,
        linkToContacts,
        briefly_about_yourself,
        informattion_about_user,
        country,
        region,
        town,
        id,
      ]
    );
    let getInfomationAboutUser = await pool.query(
      `SELECT * FROM about_user WHERE user_id_from_users = $1`,
      [id]
    );
    res.status(200).json({
      message: "Вы загрузили форму о пользователе",
      body: getInfomationAboutUser.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/getInformationAboutUser", async (req, res) => {
  try {
    let getInfomationAboutUser =
      await pool.query(`select users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname from about_user
    join users on user_id_from_users = user_id;`);
    res.status(200).json({
      message: "Вы получили информацию о пользователе",
      body: getInfomationAboutUser.rows,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/getInformationAboutUser/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getInfomationAboutUser = await pool.query(
      `SELECT * FROM about_user WHERE user_id_from_users = $1`,
      [id]
    );
    res.status(200).json({
      message: "Вы получили информацию о пользователе",
      body: getInfomationAboutUser.rows[0],
    });
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
app.get("/informationTag/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let descriptionTag = await pool.query(
      "SELECT * FROM tags WHERE tags_id = $1",
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
// get information user
// get information about questions
const port = process.env.PORT || "9999";
app.listen(port, () => {
  console.log("Server has started on port: 9999");
});
