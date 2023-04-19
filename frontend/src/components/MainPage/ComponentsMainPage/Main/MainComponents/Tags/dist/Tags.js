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
var react_router_dom_1 = require("react-router-dom");
var Tags_module_css_1 = require("./Tags.module.css");
var Tags = function () {
    var _a = react_1.useState([]), tags = _a[0], setTags = _a[1];
    var getInfoTags = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/tags/" + localStorage.getItem("userId"), {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setTags(data.tags);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getInfoTags();
    }, []);
    var subscribeFollower = function (tagsId) { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/followers/" + localStorage.getItem("userId"), {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tagsId: tagsId })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setTags(data.tags);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: Tags_module_css_1["default"]["tags-container"] },
        react_1["default"].createElement("h3", null, "\u0412\u0441\u0435 \u0442\u0435\u0433\u0438"),
        react_1["default"].createElement("div", { className: Tags_module_css_1["default"]["tags-block"] }, tags.map(function (tag) {
            return (react_1["default"].createElement("div", { key: tag.id, className: Tags_module_css_1["default"]["tags-card"] + " " + Tags_module_css_1["default"]["tags-card_outline"] + " " + Tags_module_css_1["default"]["tags-card_p"] },
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/tag/" + tag.id },
                    react_1["default"].createElement("div", { className: Tags_module_css_1["default"]["tags-card__image"] },
                        react_1["default"].createElement("img", { src: tag.img_tag, alt: "" }))),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/tag/" + tag.id, className: Tags_module_css_1["default"]["tags-card__title"] + " " + Tags_module_css_1["default"]["tags-card__title_p"] + " " + Tags_module_css_1["default"]["tags-card__title_size"] }, tag.name_tag),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/tag/" + tag.id, state: { question: "Вопросы" }, className: Tags_module_css_1["default"]["tags-card__questions"] + " " + Tags_module_css_1["default"]["tags-card__questions_outline"] + " " + Tags_module_css_1["default"]["tags-card__questions_p"] + " " + Tags_module_css_1["default"]["tags-card__questions_size"] }, tag.countQuestions + " \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432"),
                react_1["default"].createElement("button", { className: tag.btn
                        ? tag.isChecked
                            ? Tags_module_css_1["default"].btn_unsubscribe
                            : Tags_module_css_1["default"].btn_subscribe
                        : Tags_module_css_1["default"].btn_none, onClick: function () {
                        console.log(tag);
                        subscribeFollower(tag.id);
                    } },
                    tag.isChecked ? "Вы подписаны" : "Подписаться",
                    " |",
                    " ",
                    tag.countFollowers)));
        }))));
};
exports["default"] = Tags;
