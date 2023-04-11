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
var Tag_module_css_1 = require("./Tag.module.css");
var react_router_dom_1 = require("react-router-dom");
var Question_1 = require("../../AllQuestions/Question/Question");
var Tag = function () {
    var location = react_router_dom_1.useLocation();
    var question = location.state;
    var tagId = react_router_dom_1.useParams().tagId;
    var _a = react_1.useState(""), description = _a[0], setDescription = _a[1];
    var _b = react_1.useState(""), pathImg = _b[0], setPathImg = _b[1];
    var _c = react_1.useState(""), nameTag = _c[0], setNameTag = _c[1];
    var _d = react_1.useState(""), count = _d[0], setCount = _d[1];
    var _e = react_1.useState([]), questions = _e[0], setQuestions = _e[1];
    var _f = react_1.useState([]), answers = _f[0], setAnswers = _f[1];
    var _g = react_1.useState(question ? "\u0412\u043E\u043F\u0440\u043E\u0441\u044B" : "Информация"), linkValue = _g[0], setLinkValue = _g[1];
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
    var countAnswers = function (idQuestions, answers) {
        var countAnswers = answers.filter(function (element) { return element.question_id_from_questions === idQuestions; }).length;
        return countAnswers;
    };
    var getInformationTag = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/tag/" + tagId, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    setAnswers(data.answers);
                    setQuestions(data.questionsTag);
                    setCount(data.countFollowers);
                    setDescription(data.body.description);
                    setPathImg(data.body.img_tag);
                    setNameTag(data.body.name_tag);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getInformationTag();
        window.history.replaceState({}, document.title);
    }, []);
    return (react_1["default"].createElement("div", { className: Tag_module_css_1["default"].tag_container },
        react_1["default"].createElement("header", { className: Tag_module_css_1["default"].header },
            react_1["default"].createElement("img", { src: pathImg, alt: "" }),
            react_1["default"].createElement("h1", null, nameTag),
            react_1["default"].createElement("span", { className: Tag_module_css_1["default"].tag_count }, count),
            react_1["default"].createElement("span", { className: Tag_module_css_1["default"].tag_followers }, "\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432")),
        react_1["default"].createElement("main", null,
            react_1["default"].createElement("nav", { className: Tag_module_css_1["default"].nav },
                react_1["default"].createElement("div", { onClick: function () { return setLinkValue("Информация"); } },
                    react_1["default"].createElement("span", { className: linkValue === "Информация" ? Tag_module_css_1["default"].active : "" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F")),
                react_1["default"].createElement("div", { onClick: function () { return setLinkValue("Вопросы"); } },
                    react_1["default"].createElement("span", { className: linkValue === "Вопросы" ? Tag_module_css_1["default"].active : "" }, "\u0412\u043E\u043F\u0440\u043E\u0441\u044B"))),
            react_1["default"].createElement("div", null, linkValue === "Информация" ? (description) : questions.length > 0 ? (questions.map(function (question, index) {
                return (react_1["default"].createElement(Question_1["default"], { key: index, question: question, currentTime: currentTime, countAnswers: countAnswers, answers: answers }));
            })) : (react_1["default"].createElement("h4", null, "\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0435\u0442"))))));
};
exports["default"] = Tag;
