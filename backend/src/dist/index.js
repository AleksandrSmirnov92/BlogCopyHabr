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
var getQuestionsRouter = require("../dist/Routes/GetQuestionRoutes.js");
var getAnswersRouter = require("../dist/Routes/GetAnswerRoutes.js");
var getMyFeedRouter = require("../dist/Routes/GetMyFeedRoutes.js");
var cors = require("cors");
var cookieParser = require("cookie-parser");
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
app.use("/question", getQuestionsRouter);
// ----------------------------------------
app.use("/answers", getAnswersRouter);
// ----------------------------------------
app.use("/myFeed", getMyFeedRouter);
app.get("/tags", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getTags, err_1;
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
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var getAllQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getQuestions, getAnswers, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_js_1.pool.query("select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions\n    join tags on questions.question_tags = tags_id;")];
            case 1:
                getQuestions = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("\n    select * from answers\n    ")];
            case 2:
                getAnswers = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о всех вопросах",
                    questions: getQuestions.rows,
                    answers: getAnswers.rows
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
app.route("/questions").get(getAllQuestions);
module.exports = app;
