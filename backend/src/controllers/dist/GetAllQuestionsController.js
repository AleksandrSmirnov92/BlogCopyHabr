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
var db_js_1 = require("../db.js");
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.getAllQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getQuestions, getAnswers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_js_1.pool.query("select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions\n     join tags on questions.question_tags = tags_id;")];
            case 1:
                getQuestions = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("\n     select * from answers\n     ")];
            case 2:
                getAnswers = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о всех вопросах",
                    questions: getQuestions.rows,
                    answers: getAnswers.rows
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestionsId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getQuestionsId, questionsInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("questions")
                        .select("\"*\",tags(\"*\"),answers(*)")
                        .eq("user_id", id)];
            case 1:
                getQuestionsId = _a.sent();
                questionsInfo = getQuestionsId.data.map(function (obj) {
                    var questions_id = obj.questions_id, question_tags = obj.question_tags, question_title = obj.question_title, date_of_creation = obj.date_of_creation, tags = obj.tags, answers = obj.answers;
                    return {
                        question_tags: question_tags,
                        question_title: question_title,
                        date_of_creation: date_of_creation,
                        name_tag: tags.name_tag,
                        img_tag: tags.img_tag,
                        countAnswers: answers.length,
                        questions_id: questions_id
                    };
                });
                res.status(200).json({
                    message: "Вы получили информацию о всех вопросах",
                    questions: questionsInfo
                });
                return [2 /*return*/];
        }
    });
}); };