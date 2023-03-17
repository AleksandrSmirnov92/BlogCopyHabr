"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Main_module_css_1 = require("./Main.module.css");
var ProfileSettings_1 = require("./MainComponents/ProfileSettings/ProfileSettings");
var AllQuestions_1 = require("./MainComponents/AllQuestions/AllQuestions");
var AskQuestion_1 = require("./MainComponents/AskQuestion/AskQuestion");
var Tags_1 = require("./MainComponents/Tags/Tags");
var Tag_1 = require("./MainComponents/Tags/Tag/Tag");
var Users_1 = require("./MainComponents/Users/Users");
var User_1 = require("./MainComponents/Users/User/User");
var myFeed_1 = require("./MainComponents/myFeed/myFeed");
var QuestionInfo_1 = require("./MainComponents/AllQuestions/QuestionInfo/QuestionInfo");
var Main = function (_a) {
    var toggleClass = _a.toggleClass;
    return (react_1["default"].createElement("main", { className: toggleClass ? Main_module_css_1["default"].main : Main_module_css_1["default"].main + " " + Main_module_css_1["default"].main_active },
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/settingsProfil", element: react_1["default"].createElement(ProfileSettings_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(AllQuestions_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/questions", element: react_1["default"].createElement(AllQuestions_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/askQuestions", element: react_1["default"].createElement(AskQuestion_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/myFeed", element: react_1["default"].createElement(myFeed_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/tags", element: react_1["default"].createElement(Tags_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/tag/:tagId", element: react_1["default"].createElement(Tag_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/users", element: react_1["default"].createElement(Users_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/users/:userId", element: react_1["default"].createElement(User_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/questionInfo/:questionId", element: react_1["default"].createElement(QuestionInfo_1["default"], null) }))));
};
exports["default"] = Main;
