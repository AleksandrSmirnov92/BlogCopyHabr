import express from "express";
// const fileUpload = require("express-fileupload");
import { supabase } from "./config/usersDataBase.js";
const app = express();
const multer = require("multer");
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
// const getAllQuestionsId = require("../dist/Routes/getQuestionsIdRoutes.js");
const getAllInfo = require("../dist/Routes/LiveSearchNavigationRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
// ура
var storage = multer.diskStorage({
  destination: `${path.join(__dirname, "../public/uploads")}`,
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: storage }).single("file");
// ура
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(path.join(__dirname, "../public/uploads")));

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
app.use("/api/questions", getAllQuestions);
// ----------------------------------------
// app.use("/getQuestionsId", getAllQuestionsId);
// ----------------------------------------
app.use("/getAllInfo", getAllInfo);

let update = async (req: any, res: any, next: any) => {
  let { id } = req.params;
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `/uploads/${req.file.originalname}` })
    .eq("user_id", id);
  console.log(req.file.originalname + " file successfully uploaded !!");
  res.status(200).json({
    filePath: `/uploads/${req.file.originalname}`,
  });
};
app.post("/api/uploadfile/:id", update);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
