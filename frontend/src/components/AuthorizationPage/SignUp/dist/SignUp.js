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
var SchemaSignUp_1 = require("../../Schemas/SchemaSignUp");
var react_router_dom_1 = require("react-router-dom");
var SignUp_module_css_1 = require("./SignUp.module.css");
var SignUp = function () {
    var _a = react_1.useState({ status: "", message: "" }), error = _a[0], setError = _a[1];
    var onSubmit = function (values, actions) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fetch("/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    nickName: values.nickName,
                    password: values.password
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (response) {
                if (response.status === "SUCCESS") {
                    setTimeout(function () {
                        window.location.href = "http://localhost:3000/myFeed";
                    }, 1000);
                    var date = new Date();
                    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
                    document.cookie = "nickname=" + response.nickName + ";max-age=" + date;
                    localStorage.setItem("userId", JSON.stringify(Number(response.userId)));
                    console.log(response.message);
                }
                if (response.status === "ERROR") {
                    setError({ status: response.status, message: response.message });
                    setTimeout(function () {
                        setError({
                            status: "",
                            message: ""
                        });
                    }, 1500);
                }
            });
            actions.resetForm();
            return [2 /*return*/];
        });
    }); };
    var _b = formik_1.useFormik({
        initialValues: {
            email: "",
            nickName: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: onSubmit,
        validationSchema: SchemaSignUp_1.schemaForSignUp
    }), values = _b.values, errors = _b.errors, touched = _b.touched, isSubmitting = _b.isSubmitting, handleChange = _b.handleChange, handleBlur = _b.handleBlur, handleSubmit = _b.handleSubmit;
    return (react_1["default"].createElement("div", { className: "" + SignUp_module_css_1["default"]["form-container"] },
        react_1["default"].createElement("header", { className: SignUp_module_css_1["default"]["header"] + " " + SignUp_module_css_1["default"]["header_p"] },
            react_1["default"].createElement("h1", { className: SignUp_module_css_1["default"]["header__title"] },
                "\u0421\u043C\u0438\u0440 ",
                react_1["default"].createElement("span", null, " \u0410\u043A\u0430\u0443\u043D\u0442"))),
        react_1["default"].createElement("main", { className: SignUp_module_css_1["default"]["main-container"] },
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: SignUp_module_css_1["default"]["input-group"] + " " + SignUp_module_css_1["default"]["input-group_outline"] + " " + SignUp_module_css_1["default"]["input-group_p"] },
                react_1["default"].createElement("h2", null, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"),
                react_1["default"].createElement("label", { className: "" + SignUp_module_css_1["default"]["form-label"], htmlFor: "email" },
                    react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-label__text"] + " " + SignUp_module_css_1["default"]["form-label__text_color-black"] + " " + SignUp_module_css_1["default"]["form-label__text_size"] }, "E-mail")),
                react_1["default"].createElement("input", { type: "email", id: "email", value: values.email, onChange: handleChange, onBlur: handleBlur, className: errors.email && touched.email
                        ? SignUp_module_css_1["default"]["form-control-error"] + " " + SignUp_module_css_1["default"]["form-control-error_outline"] + " " + SignUp_module_css_1["default"]["form-control-error_p"]
                        : SignUp_module_css_1["default"]["form-control"] + " " + SignUp_module_css_1["default"]["form-control_outline"] + " " + SignUp_module_css_1["default"]["form-control_p"] }),
                errors.email && touched.email ? (react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-error__text"] + " " + SignUp_module_css_1["default"]["form-control-error__text_color-red"] + " " + SignUp_module_css_1["default"]["form-control-error__text_size"] }, errors.email)) : (""),
                react_1["default"].createElement("label", { className: "" + SignUp_module_css_1["default"]["form-label"], htmlFor: "nickName" },
                    react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-label__text"] + " " + SignUp_module_css_1["default"]["form-label__text_color-black"] + " " + SignUp_module_css_1["default"]["form-label__text_size"] }, "\u041D\u0438\u043A\u043D\u044D\u0439\u043C"),
                    " "),
                react_1["default"].createElement("input", { type: "text", id: "nickName", value: values.nickName, onChange: handleChange, onBlur: handleBlur, className: errors.nickName && touched.nickName
                        ? SignUp_module_css_1["default"]["form-control-error"] + " " + SignUp_module_css_1["default"]["form-control-error_outline"] + " " + SignUp_module_css_1["default"]["form-control-error_p"]
                        : SignUp_module_css_1["default"]["form-control"] + " " + SignUp_module_css_1["default"]["form-control_outline"] + " " + SignUp_module_css_1["default"]["form-control_p"] }),
                errors.nickName && touched.nickName ? (react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-error__text"] + " " + SignUp_module_css_1["default"]["form-control-error__text_color-red"] + " " + SignUp_module_css_1["default"]["form-control-error__text_size"] }, errors.nickName)) : (""),
                react_1["default"].createElement("label", { className: "" + SignUp_module_css_1["default"]["form-label"], htmlFor: "password" },
                    " ",
                    react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-label__text"] + " " + SignUp_module_css_1["default"]["form-label__text_color-black"] + " " + SignUp_module_css_1["default"]["form-label__text_size"] }, "\u041F\u0430\u0440\u043E\u043B\u044C"),
                    " "),
                react_1["default"].createElement("input", { type: "password", id: "password", value: values.password, onChange: handleChange, onBlur: handleBlur, className: errors.password && touched.password
                        ? SignUp_module_css_1["default"]["form-control-error"] + " " + SignUp_module_css_1["default"]["form-control-error_outline"] + " " + SignUp_module_css_1["default"]["form-control-error_p"]
                        : SignUp_module_css_1["default"]["form-control"] + " " + SignUp_module_css_1["default"]["form-control_outline"] + " " + SignUp_module_css_1["default"]["form-control_p"] }),
                errors.password && touched.password ? (react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-error__text"] + " " + SignUp_module_css_1["default"]["form-control-error__text_color-red"] + " " + SignUp_module_css_1["default"]["form-control-error__text_size"] }, errors.password)) : (""),
                react_1["default"].createElement("label", { className: "" + SignUp_module_css_1["default"]["form-label"], htmlFor: "confirmPassword" },
                    react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-label__text"] + " " + SignUp_module_css_1["default"]["form-label__text_color-black"] + " " + SignUp_module_css_1["default"]["form-label__text_size"] }, "\u041F\u0430\u0440\u043E\u043B\u044C \u0435\u0449\u0435 \u0440\u0430\u0437")),
                react_1["default"].createElement("input", { type: "password", id: "confirmPassword", value: values.confirmPassword, onChange: handleChange, onBlur: handleBlur, className: errors.confirmPassword && touched.confirmPassword
                        ? SignUp_module_css_1["default"]["form-control-error"] + " " + SignUp_module_css_1["default"]["form-control-error_outline"] + " " + SignUp_module_css_1["default"]["form-control-error_p"]
                        : SignUp_module_css_1["default"]["form-control"] + " " + SignUp_module_css_1["default"]["form-control_outline"] + " " + SignUp_module_css_1["default"]["form-control_p"] }),
                errors.confirmPassword && touched.confirmPassword ? (react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-error__text"] + " " + SignUp_module_css_1["default"]["form-control-error__text_color-red"] + " " + SignUp_module_css_1["default"]["form-control-error__text_size"] }, errors.confirmPassword)) : (""),
                react_1["default"].createElement("button", { type: "submit", className: error.status === "ERROR"
                        ? SignUp_module_css_1["default"]["form-control-error-server"] + " " + SignUp_module_css_1["default"]["form-control-error-server_outline"] + " " + SignUp_module_css_1["default"]["form-control-error-server_p"] + " " + SignUp_module_css_1["default"]["form-control-error-server_color"]
                        : SignUp_module_css_1["default"]["form-control-button"] + " " + SignUp_module_css_1["default"]["form-control-button_outline"] + " " + SignUp_module_css_1["default"]["form-control-button_p"], disabled: isSubmitting },
                    react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-button__text"] + " " + SignUp_module_css_1["default"]["form-control-button__text_color"] }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F")),
                error.status === "ERROR" ? (react_1["default"].createElement("span", { className: SignUp_module_css_1["default"]["form-control-error-server__text"] }, error.message)) : ("")),
            react_1["default"].createElement("div", { className: SignUp_module_css_1["default"]["button-come"] + " " + SignUp_module_css_1["default"]["button-come_outline"] + " " + SignUp_module_css_1["default"]["button-come_p"] },
                react_1["default"].createElement("span", { className: "" + SignUp_module_css_1["default"]["button-come__text"] }, "\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B?"),
                react_1["default"].createElement(react_router_dom_1.NavLink, { className: "" + SignUp_module_css_1["default"]["button-come__link"], to: "/SignIn" }, "\u0412\u043E\u0439\u0434\u0438\u0442\u0435")))));
};
exports["default"] = SignUp;