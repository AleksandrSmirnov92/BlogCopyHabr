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
var react_1 = require("react");
var AllQuestionsCSS_module_css_1 = require("./AllQuestionsCSS.module.css");
var react_router_dom_1 = require("react-router-dom");
var Question_1 = require("./Question/Question");
var AllQuestions = function () {
    var _a = react_1.useState([]), questions = _a[0], setQuestions = _a[1];
    var _b = react_1.useState("Новые вопросы"), valueLink = _b[0], setValueLink = _b[1];
    var currentTime = function (date) {
        var formatterHour = new Intl.NumberFormat("ru", {
            style: "unit",
            unit: "hour",
            unitDisplay: "long"
        });
        var formatterMinutes = new Intl.NumberFormat("ru", {
            style: "unit",
            unit: "minute",
            unitDisplay: "long"
        });
        var currentTime = new Date();
        if (date.getDate() !== currentTime.getDate() ||
            date.getMonth() !== currentTime.getMonth() ||
            date.getFullYear() !== currentTime.getFullYear()) {
            return "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " \u0432  " + formatterHour.format(date.getHours()) + " " + formatterMinutes.format(date.getMinutes());
        }
        var currentHours = currentTime.getHours() - date.getHours();
        var currentMinutes = currentTime.getMinutes() - date.getMinutes();
        return "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D " + formatterHour.format(currentHours) + " " + formatterMinutes.format(currentMinutes) + " \u043D\u0430\u0437\u0430\u0434";
    };
    var getQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/questions", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setQuestions(data.questions);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getQuestions();
    }, []);
    return (react_1["default"].createElement("div", { className: AllQuestionsCSS_module_css_1["default"]["questions-container"] },
        react_1["default"].createElement("h3", null, "\u0412\u0441\u0435 \u0412\u043E\u043F\u0440\u043E\u0441\u044B"),
        react_1["default"].createElement("nav", { className: AllQuestionsCSS_module_css_1["default"]["nav"] },
            react_1["default"].createElement(react_router_dom_1.NavLink, { className: valueLink === "Новые вопросы"
                    ? AllQuestionsCSS_module_css_1["default"]["nav-item"] + " " + AllQuestionsCSS_module_css_1["default"]["nav-item_focus"]
                    : AllQuestionsCSS_module_css_1["default"]["nav-item"], to: "/questions", onClick: function () {
                    setValueLink("Новые вопросы");
                } }, "\u041D\u043E\u0432\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B"),
            react_1["default"].createElement(react_router_dom_1.NavLink, { className: valueLink === "Без ответа"
                    ? AllQuestionsCSS_module_css_1["default"]["nav-item"] + " " + AllQuestionsCSS_module_css_1["default"]["nav-item_focus"]
                    : AllQuestionsCSS_module_css_1["default"]["nav-item"], to: "/questions", onClick: function () {
                    setValueLink("Без ответа");
                } }, "\u0411\u0435\u0437 \u043E\u0442\u0432\u0435\u0442\u0430")),
        react_1["default"].createElement("div", { className: AllQuestionsCSS_module_css_1["default"]["questions-list"] }, valueLink === "Без ответа"
            ? questions
                .filter(function (question) { return question.countAnswers === 0; })
                .map(function (question) {
                return (react_1["default"].createElement(Question_1["default"], { question: question, currentTime: currentTime }));
            })
            : questions.map(function (question) {
                return react_1["default"].createElement(Question_1["default"], { question: question, currentTime: currentTime });
            }))));
};
exports["default"] = AllQuestions;
