"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var db_js_1 = require("./db.js");
var fileUpload = require("express-fileupload");
var app = express_1["default"]();
var signInRouter = require("../dist/Routes/SignInRouters");
var signUpRouter = require("../dist/Routes/SignUpRouters");
var getInfoAboutUserRouter = require("../dist/Routes/GetInfoUserRoutes");
var createQuestion = require("../dist/Routes/CreateQuestionRoutes");
var updateProfileRouter = require("../dist/Routes/UpdateProfileRoutes");
var updateAvatarRouter = require("../dist/Routes/UpdateAvatarRouters");
var tagInfoRouter = require("../dist/Routes/TagInfoRoutes.js");
var tagsInfoRouter = require("../dist/Routes/TagsInfoRouters.js");
var followersRouter = require("../dist/Routes/FollowersInfoRoutes.js");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var fs = require("fs");
var path = require("path");
app.use(express_1["default"].json());
app.use(cors());
app.use(cookieParser());
app.use(express_1["default"].static(path.join(__dirname, "../../Frontend/public/")));
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
app.get("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(200).json({ message: "Сервер работает на порту 9999" });
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); });
app.get("/users/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getInformationAboutUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, db_js_1.pool.query("SELECT * FROM users WHERE user_id = $1", [id])];
            case 1:
                getInformationAboutUser = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о зарегестрированом пользователе",
                    body: getInformationAboutUser.rows[0]
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/tags", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getTags, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_js_1.pool.query("SELECT * FROM tags")];
            case 1:
                getTags = _a.sent();
                res.status(200).json({
                    status: "SUCCESS",
                    tags: getTags.rows
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/questions", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getQuestions_1, getAnswers_1, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_js_1.pool.query("select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions\n    join tags on questions.question_tags = tags_id;")];
            case 1:
                getQuestions_1 = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("\n    select * from answers\n    ")];
            case 2:
                getAnswers_1 = _a.sent();
                // let countFollowersGit = await pool.query(
                //   "SELECT COUNT(*) FROM followers where git = $1",
                //   ["true"]
                // );
                res.status(200).json({
                    message: "Вы получили информацию о всех вопросах",
                    questions: getQuestions_1.rows,
                    answers: getAnswers_1.rows
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/myQuestions", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getQuestions_2, getFollower, getAnswers_2, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.body.id;
                return [4 /*yield*/, db_js_1.pool.query("select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions\n    join tags on questions.question_tags = tags_id;")];
            case 1:
                getQuestions_2 = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("select followers.git,followers.javascript,followers.vue,followers.react,followers.html,followers.css from followers where followers_id_from_users = $1;", [id])];
            case 2:
                getFollower = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("\n    select * from answers\n    ")];
            case 3:
                getAnswers_2 = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о интересных мне вопросах вопросах",
                    followers: getFollower.rows[0],
                    questions: getQuestions_2.rows,
                    answers: getAnswers_2.rows
                });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// ----------------------------------------------
var getQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, getInfoUser, getAnswers_3, getQuestionInfo, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = req.params.id;
                userId = void 0;
                getInfoUser = void 0;
                if (!(req.body.userId !== "Пользователь не зарегестрирован")) return [3 /*break*/, 2];
                userId = req.body.userId;
                return [4 /*yield*/, db_js_1.pool.query("SELECT * from users JOIN about_user on about_user.user_id_from_users = $1 WHERE users.user_id = $1", [userId])];
            case 1:
                getInfoUser = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                getInfoUser = "";
                _a.label = 3;
            case 3: return [4 /*yield*/, db_js_1.pool.query("SELECT answers.answers,users.email,users.nickname,about_user.fullname,about_user.lastname,about_user.img,about_user.user_id_from_users from answers as answers JOIN users on users.user_id = answers.responce_userid JOIN about_user on about_user.user_id_from_users = answers.responce_userid WHERE answers.question_id_from_questions = $1 ORDER BY answer_id", [id])];
            case 4:
                getAnswers_3 = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("SELECT * FROM questions as q JOIN tags on tags_id = q.question_tags JOIN users on users.user_id = q.user_id JOIN about_user on about_user.user_id_from_users = q.user_id WHERE q.questions_id = $1 ", [id])];
            case 5:
                getQuestionInfo = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о вопросе",
                    questionInfo: getQuestionInfo.rows[0],
                    answers: getAnswers_3.rows,
                    userInfo: getInfoUser !== "" ? getInfoUser.rows[0] : ""
                });
                return [3 /*break*/, 7];
            case 6:
                err_5 = _a.sent();
                console.log(err_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
app.route("/question/:id").post(getQuestions);
// --------------------------------------
var getAnswers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, answer, questionId, questionUserId, userId, addInformationInAnswers, getAnswers_4, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, answer = _a.answer, questionId = _a.questionId, questionUserId = _a.questionUserId, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_js_1.pool.query("INSERT INTO answers (question_id_from_questions,user_id_from_users,answers,responce_userid) VALUES($1,$2,$3,$4)", [questionId, questionUserId, answer, userId])];
            case 2:
                addInformationInAnswers = _b.sent();
                return [4 /*yield*/, db_js_1.pool.query("SELECT answers.answers,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id ORDER BY answer_id")];
            case 3:
                getAnswers_4 = _b.sent();
                console.log(getAnswers_4.rows);
                res.status(200).json({
                    message: "Вы ответили",
                    answer: getAnswers_4.rows.at(-1)
                });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _b.sent();
                console.log(err_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
app.route("/answers").post(getAnswers);
// -----------------------------------------------
app.post("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log(req.body);
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); });
module.exports = app;
