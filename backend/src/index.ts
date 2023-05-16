import express from "express";
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
const getAllTagsRoute = require("../dist/Routes/LiveSearchTagsRoutes.js");
const getAllQuestions = require("../dist/Routes/GetAllQuestionsRoutes.js");
const getAllQuestionsId = require("../dist/Routes/getQuestionsIdRoutes.js");
const getAllInfo = require("../dist/Routes/LiveSearchNavigationRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
// app.use(express.static(path.join(__dirname, "/Frontend/build/")));
app.use(express.static(path.join(__dirname, "../Frontend/build/")));
// console.log(path.join(__dirname,"../Front/build");
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
app.use("/getQuestionsId", getAllQuestionsId);
// ----------------------------------------
app.use("/getAllInfo", getAllInfo);
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../Frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
module.exports = app;
