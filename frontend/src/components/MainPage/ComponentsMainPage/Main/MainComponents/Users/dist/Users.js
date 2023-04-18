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
var Users_module_css_1 = require("./Users.module.css");
var photoProfil_png_1 = require("../../../../../../images/photoProfil.png");
var react_router_dom_1 = require("react-router-dom");
var getInfomationAboutUser = function (setUsers) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:9999/getInformationAboutUser", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                setUsers(data.body);
                return [2 /*return*/];
        }
    });
}); };
var Users = function () {
    var _a = react_1.useState([]), users = _a[0], setUsers = _a[1];
    react_1.useEffect(function () {
        getInfomationAboutUser(setUsers);
    }, [setUsers]);
    return (react_1["default"].createElement("div", { className: "" + Users_module_css_1["default"]["users-container"] },
        react_1["default"].createElement("h3", { className: Users_module_css_1["default"]["users-container_title"] + " " + Users_module_css_1["default"]["users-container_outline"] }, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438"),
        react_1["default"].createElement("div", { className: "" + Users_module_css_1["default"]["users-content"] }, users
            .map(function (user, index) {
            return (react_1["default"].createElement("div", { className: Users_module_css_1["default"]["users-card"] + " " + Users_module_css_1["default"]["users-card_p"] + " " + Users_module_css_1["default"]["users-card_outline"], key: index },
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + user.user_id, className: "" + Users_module_css_1["default"]["users-card__image"] },
                    react_1["default"].createElement("img", { src: user.img !== "" ? user.img : photoProfil_png_1["default"], alt: "" })),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/users/" + user.user_id, className: Users_module_css_1["default"]["users-card__nickname"] + " " + Users_module_css_1["default"]["users-card__nickname_p"] + " " + Users_module_css_1["default"]["users-card__nickname_size"] }, user.fullname !== "" ? "" + user.fullname : user.nickname),
                react_1["default"].createElement("div", { className: Users_module_css_1["default"]["users-card__stat"] + " " + Users_module_css_1["default"]["users-card__stat_p"] + " " + Users_module_css_1["default"]["users-card__stat_outline"] },
                    user.answers !== "0" ? (react_1["default"].createElement(react_router_dom_1.Link, { to: "/users/" + user.user_id, state: { question: "Ответы" }, className: Users_module_css_1["default"]["users-card__stat-link"] + " " + Users_module_css_1["default"]["users-card__stat-link_p"] + " " + Users_module_css_1["default"]["users-card__stat-link_size"] },
                        "\u041E\u0442\u0432\u0435\u0442\u043E\u0432 (",
                        user.answers,
                        ")")) : (react_1["default"].createElement("span", { className: "" + Users_module_css_1["default"]["users-card__stat-link_inactive"] },
                        "\u041E\u0442\u0432\u0435\u0442\u043E\u0432 (",
                        user.answers,
                        ")")),
                    "|",
                    user.questions !== "0" ? (react_1["default"].createElement(react_router_dom_1.Link, { to: "/users/" + user.user_id, state: { question: "Вопросы" }, className: Users_module_css_1["default"]["users-card__stat-link"] + " " + Users_module_css_1["default"]["users-card__stat-link_p"] + " " + Users_module_css_1["default"]["users-card__stat-link_size"] },
                        "\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432 (",
                        user.questions,
                        ")")) : (react_1["default"].createElement("span", { className: "" + Users_module_css_1["default"]["users-card__stat-link_inactive"] },
                        "\u0412\u043E\u043F\u0440\u043E\u0441\u043E\u0432 (",
                        user.questions,
                        ")")))));
        })
            .reverse())));
};
exports["default"] = Users;
