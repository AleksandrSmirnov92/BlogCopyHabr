import express from "express";
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
const getQuestionsRouter = require("../dist/Routes/GetQuestionRoutes.js");
const getAnswersRouter = require("../dist/Routes/GetAnswerRoutes.js");
const getMyFeedRouter = require("../dist/Routes/GetMyFeedRoutes.js");
const getAllTagsRoute = require("../dist/Routes/GetAllTagsRoutes.js");
const getAllQuestions = require("../dist/Routes/GetAllQuestionsRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
app.use("/question", getQuestionsRouter);
// ----------------------------------------
app.use("/answers", getAnswersRouter);
// ----------------------------------------
app.use("/myFeed", getMyFeedRouter);
// ----------------------------------------
app.use("/tags", getAllTagsRoute);
// ----------------------------------------
app.use("/questions", getAllQuestions);
// ----------------------------------------
app.post("/getAllInfo", async (req, res) => {
  let { search } = req.body;
  let searchValue = search ? "%" + search + "%" : search;
  let upper = searchValue[1]
    ? searchValue.charAt(0) +
      searchValue.charAt(1).toUpperCase() +
      searchValue.substr(2)
    : searchValue;
  let getSearchTags = await pool.query(
    `SELECT name_tag,img_tag FROM tags as tags where tags.name_tag LIKE $2 or name_tag LIKE $1;`,
    [searchValue, upper]
  );
  let getSearchUsers = await pool.query(
    `SELECT nickname FROM users where nickname LIKE $2 or nickname LIKE $1;`,
    [searchValue, upper]
  );
  let getSearchQuestion = await pool.query(
    `SELECT question_title FROM questions where question_title LIKE $2 or question_title LIKE $1;`,
    [searchValue, upper]
  );
  let getSearchAnswers = await pool.query(
    `SELECT a.answers FROM answers as a where a.answers LIKE $2 or a.answers LIKE $1;`,
    [searchValue, upper]
  );
  let searchCollection = [
    ...getSearchTags.rows,
    ...getSearchUsers.rows,
    ...getSearchQuestion.rows,
    ...getSearchAnswers.rows,
  ];

  res.status(200).json({
    message: "Вы получили информацию обо всех направлениях",
    collection: searchCollection,
  });
});
module.exports = app;
