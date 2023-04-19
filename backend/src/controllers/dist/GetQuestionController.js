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
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.getQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getQuestionInfo, getAnswersToQuestion, answers, _a, question_title, question_details, date_of_creation, users, about_user, tags;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                if (req.body.userId !== "Пользователь не зарегестрирован") {
                }
                else {
                }
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("questions")
                        .select("\"*\",users(\"nickname\",\"email\"),about_user(\"*\"),tags(\"*\")")
                        .eq("question_tags", id)
                        .single()];
            case 1:
                getQuestionInfo = _b.sent();
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("answers")
                        .select("\"*\",about_user(\"*\")")
                        .eq("tags_id", id)];
            case 2:
                getAnswersToQuestion = _b.sent();
                answers = getAnswersToQuestion.data.map(function (obj) {
                    var _a = obj.about_user, img = _a.img, fullname = _a.fullname, lastname = _a.lastname;
                    var responce_userId = obj.responce_userId;
                    return { img: img, responce_userId: responce_userId, fullname: fullname, lastname: lastname };
                });
                console.log(getAnswersToQuestion.data);
                console.log(answers);
                _a = getQuestionInfo.data, question_title = _a.question_title, question_details = _a.question_details, date_of_creation = _a.date_of_creation, users = _a.users, about_user = _a.about_user, tags = _a.tags;
                res.status(200).json({
                    message: "Вы получили информацию о вопросе",
                    questionInfo: {
                        question_title: question_title,
                        question_details: question_details,
                        date_of_creation: date_of_creation,
                        img_tag: tags.img_tag,
                        name_tag: tags.name_tag,
                        tags_id: tags.id,
                        user_email: users.email,
                        nickname: users.nickname,
                        user_fullname: about_user.fullname,
                        user_lastname: about_user.lastname,
                        user_img: about_user.img,
                        user_id: about_user.user_id_from_users,
                        answers: answers
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
