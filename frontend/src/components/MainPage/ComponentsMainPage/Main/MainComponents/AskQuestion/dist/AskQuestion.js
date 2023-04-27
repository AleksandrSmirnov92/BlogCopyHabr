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
var formik_1 = require("formik");
var SchemaAskQuestions_1 = require("../../../../../Schemas/SchemaAskQuestions");
var AskQuestion_module_css_1 = require("./AskQuestion.module.css");
var Context_1 = require("../../../../../Context/Context");
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
var createQuestion = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/createQuestion", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        questionTitle: values.question_title,
                        questionTags: values.question_tags,
                        questionDetails: values.question_details,
                        question_id: values.question_id,
                        userId: localStorage.getItem("userId")
                    })
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                if (data.status === "SUCCESS") {
                    setTimeout(function () {
                        window.location.href = "http://localhost:3000/questions";
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
var AskQuestion = function () {
    var _a = react_1.useContext(Context_1["default"]), userId = _a.userId, setUserId = _a.setUserId;
    var _b = react_1.useState(""), nameTag = _b[0], setNameTag = _b[1];
    var _c = react_1.useState(""), correctNameTag = _c[0], setCorrectNameTag = _c[1];
    var _d = react_1.useState(""), error = _d[0], setError = _d[1];
    var _e = react_1.useState([]), massivTags = _e[0], setMassivTags = _e[1];
    react_1.useEffect(function () {
        if (userId !== null && getCookie("nickname")) {
            var getInfoTags = function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/tags", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    nameTag: nameTag
                                })
                            })];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 2:
                            data = _a.sent();
                            if (data.tags.length > 0) {
                                setMassivTags(data.tags);
                                setError("");
                            }
                            else {
                                if (data.tags.length === 0 && nameTag !== "") {
                                    setError("Такого тега не существует");
                                    setMassivTags([]);
                                }
                                else {
                                    setError("");
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            getInfoTags();
        }
        else {
            window.location.href = "http://localhost:3000/SignIn";
        }
    }, [nameTag]);
    var onSubmit = function (values, actions) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            values.question_tags = nameTag;
            if (correctNameTag !== nameTag || correctNameTag === "") {
                setError("Такого тега не существует");
            }
            else {
                setError("");
                createQuestion(values);
            }
            return [2 /*return*/];
        });
    }); };
    var _f = formik_1.useFormik({
        initialValues: {
            question_title: "",
            question_tags: "",
            question_details: "",
            question_id: ""
        },
        onSubmit: onSubmit,
        validationSchema: SchemaAskQuestions_1.schemaForAskQuestions
    }), values = _f.values, errors = _f.errors, touched = _f.touched, isSubmitting = _f.isSubmitting, handleChange = _f.handleChange, handleBlur = _f.handleBlur, handleSubmit = _f.handleSubmit;
    return (react_1["default"].createElement("div", { className: AskQuestion_module_css_1["default"]["question-container"] },
        react_1["default"].createElement("h3", { className: AskQuestion_module_css_1["default"]["question-title"] }, "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: AskQuestion_module_css_1["default"]["input-group"] },
            react_1["default"].createElement("label", { className: AskQuestion_module_css_1["default"]["form-label"] }, "\u0421\u0443\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u0430"),
            react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form__text"] }, "\u0421\u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0441\u0440\u0430\u0437\u0443 \u0431\u044B\u043B\u043E \u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043E \u0447\u0451\u043C \u0440\u0435\u0447\u044C."),
            react_1["default"].createElement("input", { id: "question_title", type: "text", value: values.question_title, onChange: handleChange, onBlur: handleBlur, className: errors.question_title && touched.question_title
                    ? AskQuestion_module_css_1["default"]["form-control-error"]
                    : AskQuestion_module_css_1["default"]["form-control"] }),
            errors.question_title && touched.question_title ? (react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form-control-error__text"] }, errors.question_title)) : (""),
            react_1["default"].createElement("label", { className: AskQuestion_module_css_1["default"]["form-label"] }, "\u0422\u044D\u0433\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u0430"),
            react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form__text"] }, "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0442\u0435\u0433 \u2014 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043D\u044B\u0445 \u043E\u0431\u043B\u0430\u0441\u0442\u0435\u0439 (HTML,CSS,JavaScript,React,Vue,Git), \u043A \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u043E\u043F\u0440\u043E\u0441 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F."),
            react_1["default"].createElement("input", { autoComplete: "off", id: "question_tags", type: "text", value: nameTag, onChange: function (e) {
                    handleChange(e);
                    setNameTag(e.target.value.trim());
                }, onBlur: function (e) {
                    handleBlur(e);
                    setNameTag(e.target.value.trim());
                }, className: (errors.question_tags || error !== "") && touched.question_tags
                    ? AskQuestion_module_css_1["default"]["form-control-error"]
                    : AskQuestion_module_css_1["default"]["form-control"] }),
            errors.question_tags && touched.question_tags ? (react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form-control-error__text"] }, errors.question_tags)) : (""),
            error ? (react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form-control-error__text"] }, error)) : (""),
            react_1["default"].createElement("div", { className: AskQuestion_module_css_1["default"]["pop-up-container"] },
                react_1["default"].createElement("ul", { className: nameTag !== "" &&
                        massivTags.length > 0 &&
                        nameTag !== correctNameTag
                        ? AskQuestion_module_css_1["default"]["pop-up"]
                        : "" }, massivTags.map(function (item, index) {
                    if (nameTag !== "" && nameTag !== item.name_tag) {
                        return (react_1["default"].createElement("li", { onMouseDown: function (e) {
                                setNameTag(item.name_tag);
                                setCorrectNameTag(item.name_tag);
                                values.question_id = item.id;
                            }, key: index, className: AskQuestion_module_css_1["default"]["pop-up__card"] },
                            react_1["default"].createElement("img", { src: item.img_tag, alt: "", className: AskQuestion_module_css_1["default"]["pop-up__image"] }),
                            item.name_tag));
                    }
                }))),
            react_1["default"].createElement("label", { className: AskQuestion_module_css_1["default"]["form-label"] }, "\u0414\u0435\u0442\u0430\u043B\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u0430"),
            react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form__text"] }, "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u044F\u0445 \u0441\u0432\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442."),
            react_1["default"].createElement("textarea", { id: "question_details", value: values.question_details, onChange: handleChange, onBlur: handleBlur, className: errors.question_details && touched.question_details
                    ? AskQuestion_module_css_1["default"]["form-control-error"]
                    : AskQuestion_module_css_1["default"]["form-control"] }),
            errors.question_details && touched.question_details ? (react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["form-control-error__text"] }, errors.question_details)) : (""),
            react_1["default"].createElement("button", { type: "submit", className: AskQuestion_module_css_1["default"]["btn"], disabled: isSubmitting },
                react_1["default"].createElement("span", { className: AskQuestion_module_css_1["default"]["btn__text"] }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C")))));
};
exports["default"] = AskQuestion;
