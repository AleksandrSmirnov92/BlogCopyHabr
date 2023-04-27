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
var Navigation_module_css_1 = require("./Navigation.module.css");
var signIn_png_1 = require("../../../../images/signIn.png");
var allQuestions_png_1 = require("../../../../images/allQuestions.png");
// import userIdContext from "../../../Context/Context";
var Exit_png_1 = require("../../../../images/Exit.png");
var Settings_png_1 = require("../../../../images/Settings.png");
var allTags_png_1 = require("../../../../images/allTags.png");
var users_png_1 = require("../../../../images/users.png");
var photoProfil_png_1 = require("../../../../images/photoProfil.png");
var nav_png_1 = require("../../../../images/nav.png");
var react_router_dom_1 = require("react-router-dom");
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
// interface Context {
//   userId: string;
//   setUserId: React.Dispatch<React.SetStateAction<string>>;
// }
var Navigation = function (_a) {
    var toggleClass = _a.toggleClass, setToggleClass = _a.setToggleClass, hideNavImg = _a.hideNavImg;
    var _b = react_1.useState(false), userRegistred = _b[0], setUserRegistred = _b[1];
    // const { userId, setUserId } = useContext<Context>(userIdContext);
    var _c = react_1.useState(""), pathImg = _c[0], setPathImg = _c[1];
    var _d = react_1.useState(""), fullName = _d[0], setFullName = _d[1];
    var _e = react_1.useState(""), lastName = _e[0], setLastName = _e[1];
    var exit = function () {
        setTimeout(function () {
            document.cookie = "nickname= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            localStorage.removeItem("userId");
            setUserRegistred(false);
        }, 1000);
    };
    react_1.useEffect(function () {
        var getInformationAboutUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/getInformationAboutUser/" + localStorage.getItem("userId"), {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setPathImg(data.users.img);
                        if (data.users.fullname !== "" || data.users.lastname !== "") {
                            setFullName(data.users.fullname);
                            setLastName(data.users.lastname);
                            return [2 /*return*/];
                        }
                        setFullName(data.body.email);
                        return [2 /*return*/];
                }
            });
        }); };
        getInformationAboutUser();
        if (getCookie("nickname") !== "") {
            setUserRegistred(true);
        }
        else {
            console.log("пользователь не зарегестрирован");
        }
    }, []);
    return (react_1["default"].createElement("nav", { className: toggleClass
            ? Navigation_module_css_1["default"]["nav"]
            : Navigation_module_css_1["default"]["nav_active"] + " " + Navigation_module_css_1["default"]["nav"] },
        react_1["default"].createElement("div", { className: Navigation_module_css_1["default"]["nav__btn"] + " " + Navigation_module_css_1["default"].show_laptop, onClick: function () {
                setToggleClass(function (prevState) { return !prevState; });
            } },
            react_1["default"].createElement("img", { src: nav_png_1["default"], alt: "", className: hideNavImg ? Navigation_module_css_1["default"].hide_img : Navigation_module_css_1["default"].nav_img })),
        react_1["default"].createElement("ul", { className: Navigation_module_css_1["default"].nav_links },
            react_1["default"].createElement("div", { className: userRegistred
                    ? Navigation_module_css_1["default"].profil_block
                    : Navigation_module_css_1["default"].profil_hide },
                react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].profil },
                    react_1["default"].createElement("a", { href: "http://localhost:3000/users/" + localStorage.getItem("userId"), className: Navigation_module_css_1["default"].profil_photo },
                        react_1["default"].createElement("img", { src: pathImg !== "" ? pathImg : photoProfil_png_1["default"], alt: "" })),
                    react_1["default"].createElement("a", { href: "http://localhost:3000/users/" + localStorage.getItem("userId"), className: Navigation_module_css_1["default"].profil_nickname }, fullName + " " + lastName)),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "./settingsProfil", className: (Navigation_module_css_1["default"].profil_settings, Navigation_module_css_1["default"].nav_a), onClick: function () {
                        setToggleClass(function (prevState) { return !prevState; });
                    } },
                    react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].profil_settings },
                        react_1["default"].createElement("img", { src: Settings_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                        "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438")),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "./questions", className: Navigation_module_css_1["default"].nav_a, onClick: function () {
                        exit();
                        setToggleClass(function (prevState) { return !prevState; });
                    } },
                    react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].profil_settings },
                        react_1["default"].createElement("img", { src: Exit_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                        "\u0412\u044B\u0445\u043E\u0434")),
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "./myFeed", className: Navigation_module_css_1["default"].nav_a, onClick: function () { return setToggleClass(function (prevState) { return !prevState; }); } },
                    react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].nav_li },
                        react_1["default"].createElement("img", { src: allTags_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                        "\u041C\u043E\u044F \u043B\u0435\u043D\u0442\u0430"))),
            react_1["default"].createElement("div", { className: userRegistred
                    ? Navigation_module_css_1["default"].profil_hide
                    : Navigation_module_css_1["default"].profil_block },
                react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].profil_signin },
                    react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/SignIn", className: Navigation_module_css_1["default"].nav_a },
                        react_1["default"].createElement("img", { src: signIn_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                        "\u0412\u043E\u0439\u0442\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442"))),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/questions", className: Navigation_module_css_1["default"].nav_a, onClick: function () { return setToggleClass(function (prevState) { return !prevState; }); } },
                react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].nav_li },
                    react_1["default"].createElement("img", { src: allQuestions_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                    "\u0412\u0441\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B")),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "./tags", className: Navigation_module_css_1["default"].nav_a, onClick: function () { return setToggleClass(function (prevState) { return !prevState; }); } },
                react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].nav_li },
                    react_1["default"].createElement("img", { src: allTags_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                    "\u0412\u0441\u0435 \u0442\u0435\u0433\u0438")),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "./users", className: Navigation_module_css_1["default"].nav_a, onClick: function () { return setToggleClass(function (prevState) { return !prevState; }); } },
                react_1["default"].createElement("li", { className: Navigation_module_css_1["default"].nav_li },
                    react_1["default"].createElement("img", { src: users_png_1["default"], alt: "", className: Navigation_module_css_1["default"].nav_img }),
                    "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438")))));
};
exports["default"] = Navigation;
