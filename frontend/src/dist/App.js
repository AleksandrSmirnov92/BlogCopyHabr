"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var MainPage_1 = require("./components/MainPage/MainPage");
var SignIn_1 = require("./components/AuthorizationPage/SignIn/SignIn");
var SignUp_1 = require("./components/AuthorizationPage/SignUp/SignUp");
require("./App.css");
function App() {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/*", element: react_1["default"].createElement(MainPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/SignIn", element: react_1["default"].createElement(SignIn_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/SignUp", element: react_1["default"].createElement(SignUp_1["default"], null) }))));
}
exports["default"] = App;
