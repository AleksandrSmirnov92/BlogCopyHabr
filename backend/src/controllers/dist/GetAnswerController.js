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
// import { pool } from "../db.js";
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.getAnswers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, answer, questionId, tagsId, userId, insertAnswer, getAnswersToQuestion, answerData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, answer = _a.answer, questionId = _a.questionId, tagsId = _a.tagsId, userId = _a.userId;
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("answers")
                        .upsert({
                        user_id_from_users: userId,
                        answers: answer,
                        question_id_from_questions: questionId,
                        tags_id: tagsId,
                        responce_userId: userId
                    })
                        .select()
                        .single()];
            case 1:
                insertAnswer = _b.sent();
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("answers")
                        .select("\"*\",about_user(\"*\"),users(\"*\")")
                        .match({
                        answer_id: insertAnswer.data.answer_id,
                        tags_id: tagsId,
                        question_id_from_questions: questionId
                    })];
            case 2:
                getAnswersToQuestion = _b.sent();
                answerData = getAnswersToQuestion.data.map(function (obj) {
                    var _a = obj.about_user, img = _a.img, fullname = _a.fullname, lastname = _a.lastname;
                    var responce_userId = obj.responce_userId, answers = obj.answers;
                    var email = obj.users.email;
                    return { img: img, responce_userId: responce_userId, fullname: fullname, lastname: lastname, email: email, answer: answers };
                });
                res.status(200).json({
                    message: "Вы ответили",
                    answer: answerData[0]
                });
                return [2 /*return*/];
        }
    });
}); };