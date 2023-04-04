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
var QuestionPanel_module_css_1 = require("./QuestionPanel.module.css");
var Context_1 = require("../../../Context/Context");
var plus_png_1 = require("../../../../images/plus.png");
var searh_png_1 = require("../../../../images/searh.png");
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
var QuestionPanel = function (_a) {
    var toggleClass = _a.toggleClass, setHideNavImg = _a.setHideNavImg;
    var _b = react_1.useContext(Context_1["default"]), userId = _b.userId, setUserId = _b.setUserId;
    var _c = react_1.useState("hide_search"), classHideSearch = _c[0], setClassHideSearch = _c[1];
    var _d = react_1.useState(""), inputValue = _d[0], setInputValue = _d[1];
    var _e = react_1.useState([]), collectionSearch = _e[0], setCollectionSearch = _e[1];
    var getAllInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/getAllInfo", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            search: inputValue
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setCollectionSearch(data.collection);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getAllInfo();
        setUserId(JSON.parse(localStorage.getItem("userId")));
    }, [inputValue]);
    console.log(collectionSearch);
    return (react_1["default"].createElement("div", { className: toggleClass
            ? QuestionPanel_module_css_1["default"].question_panel
            : QuestionPanel_module_css_1["default"].question_panel_active + " " + QuestionPanel_module_css_1["default"].question_panel },
        react_1["default"].createElement("div", { className: "" + QuestionPanel_module_css_1["default"][classHideSearch] },
            react_1["default"].createElement("input", { type: "text", placeholder: "\u041D\u0430\u0439\u0434\u0438 \u0432\u043E\u043F\u0440\u043E\u0441,\u043E\u0442\u0432\u0435\u0442,\u0442\u0435\u0433 \u0438\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }),
            react_1["default"].createElement("span", { onClick: function () {
                    setClassHideSearch("hide_search");
                    setHideNavImg(function (prevState) { return !prevState; });
                } }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")),
        react_1["default"].createElement("div", { className: toggleClass
                ? QuestionPanel_module_css_1["default"].nav_menu + " " + QuestionPanel_module_css_1["default"].show_laptop + " " + QuestionPanel_module_css_1["default"].nav_menu_active
                : QuestionPanel_module_css_1["default"].nav_menu + " " + QuestionPanel_module_css_1["default"].show_laptop },
            react_1["default"].createElement("h1", null, "\u0421\u043C\u0438\u0440"),
            react_1["default"].createElement("span", null, "Q&A")),
        react_1["default"].createElement("div", { className: QuestionPanel_module_css_1["default"].form_control__wrapper + " " + QuestionPanel_module_css_1["default"].hide_mobile },
            react_1["default"].createElement("input", { className: "" + QuestionPanel_module_css_1["default"].form_control, value: inputValue, type: "text", placeholder: "\u041D\u0430\u0439\u0434\u0438 \u0432\u043E\u043F\u0440\u043E\u0441,\u043E\u0442\u0432\u0435\u0442,\u0442\u0435\u0433 \u0438\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F", onChange: function (e) {
                    setInputValue(e.target.value);
                    console.log(inputValue);
                } }),
            react_1["default"].createElement("div", { className: "" + QuestionPanel_module_css_1["default"].form_control__search_menu_wrapper },
                react_1["default"].createElement("ul", { className: "" + QuestionPanel_module_css_1["default"].form_control__search_menu }, collectionSearch.map(function (item, index) {
                    return (react_1["default"].createElement("li", { className: "" + QuestionPanel_module_css_1["default"].form_control__search_menu__item, key: index },
                        react_1["default"].createElement("div", { className: QuestionPanel_module_css_1["default"].search_menu__item_wrapper },
                            react_1["default"].createElement("a", { className: item.img_tag
                                    ? QuestionPanel_module_css_1["default"].form_control__search_menu__item__image
                                    : "", href: "#" },
                                react_1["default"].createElement("img", { src: item.img_tag, alt: "" })),
                            react_1["default"].createElement("span", null, item.name_tag ||
                                item.nickname ||
                                item.question_title ||
                                item.answers))));
                })))),
        react_1["default"].createElement(react_router_dom_1.NavLink, { to: userId !== null && getCookie("nickname")
                ? "./askQuestions"
                : "./SignIn", className: QuestionPanel_module_css_1["default"].button + " " + QuestionPanel_module_css_1["default"].hide_tablet }, "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441"),
        react_1["default"].createElement("div", { className: QuestionPanel_module_css_1["default"].header__toolbar + " " + QuestionPanel_module_css_1["default"].show_tablet },
            react_1["default"].createElement("img", { onClick: function () {
                    setClassHideSearch("show_search");
                    setHideNavImg(function (prevState) { return !prevState; });
                }, src: searh_png_1["default"], alt: "", className: QuestionPanel_module_css_1["default"].searh_img + " " + QuestionPanel_module_css_1["default"].show_mobile }),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: userId !== null && getCookie("nickname")
                    ? "./askQuestions"
                    : "./SignIn" },
                react_1["default"].createElement("img", { src: plus_png_1["default"], alt: "", className: QuestionPanel_module_css_1["default"].plus_img })))));
};
exports["default"] = QuestionPanel;
