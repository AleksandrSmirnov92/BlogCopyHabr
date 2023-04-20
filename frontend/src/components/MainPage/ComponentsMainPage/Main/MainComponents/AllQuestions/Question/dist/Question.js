"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Question_module_css_1 = require("./Question.module.css");
var react_router_dom_1 = require("react-router-dom");
var Question = function (_a) {
    var question = _a.question, currentTime = _a.currentTime;
    return (react_1["default"].createElement("div", { className: Question_module_css_1["default"].question_container },
        react_1["default"].createElement("header", { className: Question_module_css_1["default"].header },
            react_1["default"].createElement("div", { className: Question_module_css_1["default"].header_icon },
                react_1["default"].createElement("img", { src: question.img_tag, alt: "" })),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/tag/" + question.question_tags }, question.name_tag.toUpperCase())),
        react_1["default"].createElement("main", { className: Question_module_css_1["default"].content },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/questionInfo/" + question.questions_id, state: { questionTagsId: question.question_tags } }, question.question_title),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("span", null, currentTime(new Date("" + question.date_of_creation)))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/questionInfo/" + question.questions_id, state: { questionTagsId: question.question_tags } },
                react_1["default"].createElement("span", null, question.countAnswers),
                react_1["default"].createElement("br", null),
                "\u041E\u0442\u0432\u0435\u0442\u043E\u0432"))));
};
exports["default"] = Question;
