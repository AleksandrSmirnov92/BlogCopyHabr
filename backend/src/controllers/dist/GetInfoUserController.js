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
exports.getAllInfoAboutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getInfomationAboutUser, get, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_js_1.pool.query("select (select count(*) from answers where responce_userid = user_id) as answers,(select count(*) from questions where questions.user_id = users.user_id) as questions, users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname from  about_user\n      join users on user_id_from_users = user_id ;")];
            case 1:
                getInfomationAboutUser = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("select count(*) from questions where questions.user_id = user_id;")];
            case 2:
                get = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о пользователе",
                    body: getInfomationAboutUser.rows
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
exports.getInfoAboutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getInfomationAboutUser, getInformationAboutQuestions, getAllInformationAboutAnswers, getInformationAboutAnsers, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                return [4 /*yield*/, db_js_1.pool.query("select  users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname, about_user.contacts, about_user.linktocontacts, about_user.briefly_about_yourself,about_user.informattion_about_user ,about_user.country ,about_user.region ,about_user.town from about_user\n        join users on user_id_from_users = user_id where user_id_from_users = $1", [id])];
            case 1:
                getInfomationAboutUser = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("SELECT * FROM questions as q1 join tags on question_tags = tags_id WHERE q1.user_id = $1", [id])];
            case 2:
                getInformationAboutQuestions = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("select * from answers;")];
            case 3:
                getAllInformationAboutAnswers = _a.sent();
                return [4 /*yield*/, db_js_1.pool.query("SELECT * from answers as an join questions on question_id_from_questions = questions_id join users on responce_userid = users.user_id WHERE an.responce_userid = $1", [id])];
            case 4:
                getInformationAboutAnsers = _a.sent();
                res.status(200).json({
                    message: "Вы получили информацию о пользователе",
                    body: getInfomationAboutUser.rows[0],
                    questions: getInformationAboutQuestions.rows,
                    answers: getAllInformationAboutAnswers.rows,
                    myAnswers: getInformationAboutAnsers.rows
                });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
