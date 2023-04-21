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
var User_module_css_1 = require("./User.module.css");
var photoProfil_png_1 = require("../../../../../../../images/photoProfil.png");
var Question_1 = require("../../AllQuestions/Question/Question");
var react_router_dom_1 = require("react-router-dom");
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
var User = function () {
    var userId = react_router_dom_1.useParams().userId;
    var location = react_router_dom_1.useLocation();
    var question = location.state;
    var _a = react_1.useState(""), fullName = _a[0], setFullName = _a[1];
    var _b = react_1.useState(""), lastName = _b[0], setLastName = _b[1];
    var _c = react_1.useState(""), brieflyAboutYourself = _c[0], setBrieflyAboutYourself = _c[1];
    var _d = react_1.useState(""), pathImg = _d[0], setPathImg = _d[1];
    var _e = react_1.useState(""), contacts = _e[0], setContacts = _e[1];
    var _f = react_1.useState(""), linkToContacts = _f[0], setLinkContacts = _f[1];
    var _g = react_1.useState(""), country = _g[0], setCountry = _g[1];
    var _h = react_1.useState(""), region = _h[0], setRegion = _h[1];
    var _j = react_1.useState(""), town = _j[0], setTown = _j[1];
    var _k = react_1.useState(""), informattionAboutUser = _k[0], setInformattionAboutUser = _k[1];
    var _l = react_1.useState([]), questions = _l[0], setQuestions = _l[1];
    var _m = react_1.useState([]), myAnswers = _m[0], setMyAnswers = _m[1];
    var _o = react_1.useState(question ? "" + question.question : "Информация"), linkValue = _o[0], setLinkValue = _o[1];
    var getQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/questions/" + userId, {
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
    var getAnswers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/answers/" + userId, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setMyAnswers(data.answers);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var getSettingsInformation = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/getInformationAboutUser/" + userId, {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setBrieflyAboutYourself(data.users.briefly_about_yourself);
                        setContacts(data.users.contacts);
                        setLinkContacts(data.users.linktocontacts);
                        setCountry(data.users.country);
                        setRegion(data.users.region);
                        setTown(data.users.town);
                        setFullName(data.users.fullname);
                        setLastName(data.users.lastname);
                        setPathImg(data.users.img);
                        setInformattionAboutUser(data.users.informattion_about_user);
                        return [2 /*return*/];
                }
            });
        }); };
        getSettingsInformation();
        if (linkValue === "Вопросы") {
            getQuestions();
        }
        if (linkValue === "Ответы") {
            getAnswers();
        }
        window.history.replaceState({}, document.title);
    }, []);
    return (react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["user-container"] },
        react_1["default"].createElement("header", { className: "" + User_module_css_1["default"]["user-header"] },
            react_1["default"].createElement("a", { href: "http://localhost:3000/users/" + localStorage.getItem("userId"), className: "" + User_module_css_1["default"]["user-header__image"] },
                react_1["default"].createElement("img", { src: pathImg === "" ? photoProfil_png_1["default"] : pathImg, alt: "" })),
            react_1["default"].createElement("span", { className: User_module_css_1["default"]["user-header__title"] + " " + User_module_css_1["default"]["user-header__title_size"] },
                fullName,
                " ",
                lastName),
            react_1["default"].createElement("span", { className: User_module_css_1["default"]["user-header__subtitle"] + " " + User_module_css_1["default"]["user-header__subtitle_size"] },
                " ",
                brieflyAboutYourself)),
        react_1["default"].createElement("nav", { className: User_module_css_1["default"]["nav"] + " " + User_module_css_1["default"]["nav_outline"] },
            react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["nav__item"], onClick: function () { return setLinkValue("Информация"); } },
                react_1["default"].createElement("span", { className: linkValue === "Информация" ? User_module_css_1["default"].active : "" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F")),
            react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["nav__item"], onClick: function () {
                    setLinkValue("Вопросы");
                    getQuestions();
                } },
                react_1["default"].createElement("span", { className: linkValue === "Вопросы" ? User_module_css_1["default"].active : "" }, "\u0412\u043E\u043F\u0440\u043E\u0441\u044B")),
            react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["nav__item"], onClick: function () {
                    setLinkValue("Ответы");
                    getAnswers();
                } },
                react_1["default"].createElement("span", { className: linkValue === "Ответы" ? User_module_css_1["default"].active : "" }, "\u041E\u0442\u0432\u0435\u0442\u044B"))),
        react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["user-content"] }, linkValue === "Информация" ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h4", { className: User_module_css_1["default"]["user-content__title"] + " " + User_module_css_1["default"]["user-content__title_p"] }, informattionAboutUser !== "" ? "Обо мне" : ""),
            react_1["default"].createElement("span", { className: "" + User_module_css_1["default"]["user-content__text"] },
                " ",
                informattionAboutUser,
                " "),
            react_1["default"].createElement("h4", { className: User_module_css_1["default"]["user-content__title"] + " " + User_module_css_1["default"]["user-content__title_p"] }, contacts !== "Контакты" ? "Контакты" : ""),
            react_1["default"].createElement("span", { className: "" + User_module_css_1["default"]["user-content__text"] },
                contacts !== "Контакты" ? contacts + " :" : "",
                react_1["default"].createElement("a", { className: "" + User_module_css_1["default"]["user-content__link-to-contacts"], href: linkToContacts }, linkToContacts)),
            react_1["default"].createElement("h4", { className: User_module_css_1["default"]["user-content__title"] + " " + User_module_css_1["default"]["user-content__title_p"] }, country !== "Страна" ? "Местоположение" : ""),
            react_1["default"].createElement("span", { className: "" + User_module_css_1["default"]["user-content__text"] }, country !== "Страна" ? country + "," + region + "," + town : ""))) : linkValue === "Вопросы" ? (questions.length > 0 ? (questions.map(function (question, index) {
            return (react_1["default"].createElement(Question_1["default"], { key: index, question: question, currentTime: currentTime }));
        })) : (react_1["default"].createElement("h4", { className: User_module_css_1["default"]["user-content__title"] + " " + User_module_css_1["default"]["user-content__title_p"] }, "\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0435\u0442"))) : myAnswers.length > 0 ? (myAnswers.map(function (answer, index) {
            return (react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["answer-container"], key: index },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/questionInfo/" + answer.questions_id, className: "" + User_module_css_1["default"]["answer-title"], state: { questionTagsId: answer.question_tags } }, answer.question_title),
                react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["answer-content"] },
                    react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["answer-content__image"] },
                        react_1["default"].createElement("img", { src: pathImg === "" ? photoProfil_png_1["default"] : pathImg })),
                    react_1["default"].createElement("span", { className: "" + User_module_css_1["default"]["answer-content__nickname"] }, answer.nickname),
                    react_1["default"].createElement("span", { className: "" + User_module_css_1["default"]["answer-content__email"] }, answer.email)),
                react_1["default"].createElement("div", { className: "" + User_module_css_1["default"]["answer-content__details"] }, answer.answers)));
        })) : (react_1["default"].createElement("h4", { className: User_module_css_1["default"]["user-content__title"] + " " + User_module_css_1["default"]["user-content__title_p"] }, "\u041E\u0442\u0432\u0435\u0442\u043E\u0432 \u043D\u0435\u0442")))));
};
exports["default"] = User;
