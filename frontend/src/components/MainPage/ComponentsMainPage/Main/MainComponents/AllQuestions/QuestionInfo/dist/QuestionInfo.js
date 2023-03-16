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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var SchemaAnswers_1 = require("../../../../../../Schemas/SchemaAnswers");
var photoProfil_png_1 = require("../../../../../../../images/photoProfil.png");
var ______png_1 = require("../../../../../../../images/\u0437\u0430\u043C\u043E\u043A.png");
var formik_1 = require("formik");
var QuestionInfo_module_css_1 = require("./QuestionInfo.module.css");
var react_router_dom_1 = require("react-router-dom");
var QuestionInfo = function () {
    var _a = react_1.useState(""), pathImg = _a[0], setPathImg = _a[1];
    var _b = react_1.useState(""), name = _b[0], setName = _b[1];
    var _c = react_1.useState(""), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(""), pathMyImg = _d[0], setPathMyImg = _d[1];
    var _e = react_1.useState(""), userActive = _e[0], setUserActive = _e[1];
    var _f = react_1.useState(""), questionUserId = _f[0], setQusestionUserId = _f[1];
    var _g = react_1.useState(""), tagsId = _g[0], setTagsId = _g[1];
    var _h = react_1.useState(""), nameTag = _h[0], setNameTag = _h[1];
    var _j = react_1.useState(""), tagImgPath = _j[0], setTagImgPath = _j[1];
    var _k = react_1.useState(""), questionTitle = _k[0], setQuestionTitle = _k[1];
    var _l = react_1.useState(""), questionDescription = _l[0], setQuestionDescription = _l[1];
    var _m = react_1.useState(""), questionTimeCreation = _m[0], setQuestionTimeCreation = _m[1];
    var _o = react_1.useState([]), answers = _o[0], setAnswers = _o[1];
    var _p = react_1.useState(""), userId = _p[0], setUserId = _p[1];
    var questionId = react_router_dom_1.useParams().questionId;
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
    var getQuestion = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/question/" + questionId, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userId: localStorage.getItem("userId")
                                ? localStorage.getItem("userId")
                                : "Пользователь не зарегестрирован"
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    setPathImg(data.questionInfo.img);
                    setName("" + (data.questionInfo.fullname !== ""
                        ? data.questionInfo.fullname + " " + data.questionInfo.lastname
                        : data.questionInfo.nickname));
                    setEmail(data.questionInfo.email);
                    setQusestionUserId(data.questionInfo.user_id_from_users);
                    setTagsId(data.questionInfo.tags_id);
                    setNameTag(data.questionInfo.name_tag);
                    setTagImgPath(data.questionInfo.img_tag);
                    setQuestionTitle(data.questionInfo.question_title);
                    setQuestionDescription(data.questionInfo.question_details);
                    setQuestionTimeCreation(currentTime(new Date("" + data.questionInfo.date_of_creation)));
                    setAnswers(data.answers);
                    setPathMyImg(data.userInfo.img);
                    setUserActive(data.userInfo);
                    setUserId(data.userInfo.user_id);
                    return [2 /*return*/];
            }
        });
    }); };
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/answers", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            answer: values.answers,
                            questionId: questionId,
                            questionUserId: questionUserId,
                            userId: userId
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    setAnswers(function (prevState) { return __spreadArrays(prevState, [data.answer]); });
                    values.answers = "";
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getQuestion();
        console.log("Страница вопроса");
    }, []);
    var _q = formik_1.useFormik({
        initialValues: {
            answers: ""
        },
        onSubmit: onSubmit,
        validationSchema: SchemaAnswers_1.schemaAnswers
    }), values = _q.values, errors = _q.errors, touched = _q.touched, isSubmitting = _q.isSubmitting, handleChange = _q.handleChange, handleBlur = _q.handleBlur, handleSubmit = _q.handleSubmit;
    return (react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].main_сontainer },
        react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].question_head },
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + questionUserId, className: QuestionInfo_module_css_1["default"].question_head_img },
                react_1["default"].createElement("img", { src: pathImg ? pathImg : photoProfil_png_1["default"], alt: "" })),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + questionUserId, className: QuestionInfo_module_css_1["default"].question_head_user_name }, name),
            react_1["default"].createElement("span", null, email)),
        react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].question_tags },
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/tag/" + tagsId },
                react_1["default"].createElement("img", { src: tagImgPath, alt: "" })),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/tag/" + tagsId },
                react_1["default"].createElement("span", null, nameTag))),
        react_1["default"].createElement("h1", { className: QuestionInfo_module_css_1["default"].question_title }, questionTitle),
        react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].question_body },
            react_1["default"].createElement("p", null,
                react_1["default"].createElement("span", null, questionDescription)),
            react_1["default"].createElement("span", null, questionTimeCreation)),
        react_1["default"].createElement("h2", { className: answers.length !== 0
                ? QuestionInfo_module_css_1["default"].question_answers_title
                : QuestionInfo_module_css_1["default"].hide },
            "\u041E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B (",
            answers.length,
            ")"),
        react_1["default"].createElement("div", { className: answers.length !== 0
                ? QuestionInfo_module_css_1["default"].question_answers_block
                : QuestionInfo_module_css_1["default"].hide }, answers.map(function (answer, index) {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].question_answer, key: index },
                    react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + answer.user_id_from_users, className: QuestionInfo_module_css_1["default"].question_answer_img },
                        react_1["default"].createElement("img", { src: answer.img, alt: "" })),
                    react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + answer.user_id_from_users, className: QuestionInfo_module_css_1["default"].question_answer_username },
                        react_1["default"].createElement("span", null, answer.fullname + " " + answer.lastname)),
                    react_1["default"].createElement("span", null, answer.email)),
                react_1["default"].createElement("span", { className: QuestionInfo_module_css_1["default"].question_answer_clarification }, "\u042D\u0442\u043E \u043C\u043E\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u0442\u0432\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441"),
                react_1["default"].createElement("p", { className: QuestionInfo_module_css_1["default"].question_answer_text }, answer.answers)));
        })),
        react_1["default"].createElement("h2", { className: QuestionInfo_module_css_1["default"].question_answers_title }, "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441"),
        react_1["default"].createElement("div", { className: localStorage.getItem("userId")
                ? QuestionInfo_module_css_1["default"].showAuthorisation
                : QuestionInfo_module_css_1["default"].hideAuthorisation },
            react_1["default"].createElement("form", { onSubmit: handleSubmit },
                react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].question_answer_form },
                    react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + localStorage.getItem("userId"), className: QuestionInfo_module_css_1["default"].my_answer__img_link },
                        react_1["default"].createElement("img", { src: pathMyImg ? pathMyImg : photoProfil_png_1["default"], className: QuestionInfo_module_css_1["default"].my_answer__img, alt: "" })),
                    react_1["default"].createElement("textarea", { name: "", id: "answers", className: errors.answers && touched.answers
                            ? QuestionInfo_module_css_1["default"].form_control__error
                            : QuestionInfo_module_css_1["default"].form_control, value: values.answers, onChange: handleChange, onBlur: handleBlur })),
                errors.answers && touched.answers ? (react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].form_control__error__message },
                    react_1["default"].createElement("span", null, errors.answers))) : (""),
                react_1["default"].createElement("button", { type: "submit", className: QuestionInfo_module_css_1["default"].btn, disabled: isSubmitting },
                    react_1["default"].createElement("span", { className: QuestionInfo_module_css_1["default"].btn__text }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C")))),
        react_1["default"].createElement("div", { className: userActive
                ? QuestionInfo_module_css_1["default"].hideAuthorisation
                : QuestionInfo_module_css_1["default"].showAuthorisation },
            react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].authorisation },
                react_1["default"].createElement("div", { className: QuestionInfo_module_css_1["default"].authorisation__img },
                    react_1["default"].createElement("img", { src: ______png_1["default"], alt: "" })),
                react_1["default"].createElement("h3", null, "\u0412\u043E\u0439\u0434\u0438\u0442\u0435,\u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442"),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/SignIn", className: QuestionInfo_module_css_1["default"].link_to_authorisation_container },
                    react_1["default"].createElement("span", { className: QuestionInfo_module_css_1["default"].link_to_authorisation_text }, "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u0446\u0435\u043D\u0442\u0440 \u0430\u0432\u0442\u043E\u0440\u0438\u0446\u0430\u0446\u0438\u0438"))))));
};
exports["default"] = QuestionInfo;
