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
var SchemaProfileSettings_1 = require("../../../../../Schemas/SchemaProfileSettings");
var ProfileSettings_module_css_1 = require("./ProfileSettings.module.css");
var photoProfil_png_1 = require("../../../../../../images/photoProfil.png");
var Context_1 = require("../../../../../Context/Context");
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
var resetContacts = function (e, setLinkContactsValue) {
    if (e === "Контакты") {
        setLinkContactsValue("");
    }
};
var ProfileSettings = function () {
    var _a = react_1.useContext(Context_1["default"]), userId = _a.userId, setUserId = _a.setUserId;
    var _b = react_1.useState(""), name = _b[0], setName = _b[1];
    var _c = react_1.useState(""), lastName = _c[0], setLastName = _c[1];
    var _d = react_1.useState(""), brieflyAboutYourself = _d[0], setBrieflyAboutYourself = _d[1];
    var _e = react_1.useState(""), aboutMySelf = _e[0], setAboutMySelf = _e[1];
    var _f = react_1.useState(""), contacts = _f[0], setContacts = _f[1];
    var _g = react_1.useState(""), linkContactsValue = _g[0], setLinkContactsValue = _g[1];
    var _h = react_1.useState("Страна"), country = _h[0], setCountry = _h[1];
    var _j = react_1.useState("Регион"), region = _j[0], setRegion = _j[1];
    var _k = react_1.useState("Город"), town = _k[0], setTown = _k[1];
    var _l = react_1.useState(""), pathImg = _l[0], setPathImg = _l[1];
    var myRef = react_1.useRef();
    // --------------------------------------------
    var locationCheck = function (e) {
        switch (e) {
            case "Страна":
                setRegion("Регион");
                setTown("Город");
                break;
            case "Регион":
                setTown("Город");
                break;
        }
    };
    // ----------------------------------------------
    var sendAvatar = function (selectedFile) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedFile) {
                        alert("Пожалуйста загрузите файл");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.set("file", selectedFile);
                    return [4 /*yield*/, fetch("/updateAvatar/" + localStorage.getItem("userId"), {
                            method: "POST",
                            body: formData
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setPathImg(data.filePath);
                    return [2 /*return*/];
            }
        });
    }); };
    // -----------------------------------------------
    var deleteImg = function (filePath, setPathImg, myRef) { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/updateAvatar/" + localStorage.getItem("userId"), {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            path: filePath
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setPathImg(data.filePath);
                    myRef.current.value = "";
                    return [2 /*return*/];
            }
        });
    }); };
    // --------------------------------------------------
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(brieflyAboutYourself, localStorage.getItem("userId"));
                    return [4 /*yield*/, fetch("/updateProfile", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                id: localStorage.getItem("userId"),
                                fullName: name,
                                lastName: lastName,
                                contacts: contacts,
                                linkToContacts: linkContactsValue,
                                briefly_about_yourself: brieflyAboutYourself,
                                information_about_user: aboutMySelf,
                                country: country,
                                region: region,
                                town: town
                            })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    setTimeout(function () {
                        window.location.href = "http://localhost:3000/users/" + localStorage.getItem("userId");
                    }, 500);
                    return [2 /*return*/];
            }
        });
    }); };
    // ------------------------------------------------------------------------
    react_1.useEffect(function () {
        if (userId !== null && getCookie("nickname")) {
            var getSettingsInformation = function (values) { return __awaiter(void 0, void 0, void 0, function () {
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
                            values.name = data.users.fullname;
                            setName(data.users.fullname);
                            values.lastName = data.users.lastname;
                            setLastName(data.users.lastname);
                            values.brieflyAboutYourself = data.users.briefly_about_yourself;
                            setBrieflyAboutYourself(data.users.briefly_about_yourself);
                            values.aboutMySelf = data.users.informattion_about_user;
                            setAboutMySelf(data.users.information_about_user);
                            values.contacts = data.users.contacts;
                            setContacts(data.users.contacts);
                            values.linkToContacts = data.users.linktocontacts;
                            setLinkContactsValue(data.users.linktocontacts);
                            values.country = data.users.country;
                            setCountry(data.users.country);
                            values.region = data.users.region;
                            setRegion(data.users.region);
                            values.town = data.users.town;
                            setTown(data.users.town);
                            setPathImg(data.users.img);
                            return [2 /*return*/];
                    }
                });
            }); };
            getSettingsInformation(values);
        }
        else {
            window.location.href = "http://localhost:3000/SignIn";
        }
    }, [pathImg]);
    var _m = formik_1.useFormik({
        initialValues: {
            img: "",
            name: "",
            lastName: "",
            brieflyAboutYourself: "",
            aboutMySelf: "",
            contacts: "Контакты",
            linkToContacts: "",
            country: "Страна",
            region: "Регион",
            town: "Город"
        },
        onSubmit: onSubmit,
        validationSchema: SchemaProfileSettings_1.schemaForProfileSettings
    }), values = _m.values, errors = _m.errors, touched = _m.touched, handleChange = _m.handleChange, handleBlur = _m.handleBlur, handleSubmit = _m.handleSubmit;
    return (react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["profile-container"] },
        react_1["default"].createElement("h3", null, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F"),
        react_1["default"].createElement("nav", { className: ProfileSettings_module_css_1["default"]["nav"] },
            react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["nav__item"] }, "\u0410\u043D\u043A\u0435\u0442\u0430")),
        react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["profile-avatar-block"] },
            react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["profile-avatar-block__image"] },
                react_1["default"].createElement("img", { src: !pathImg ? photoProfil_png_1["default"] : pathImg, alt: "" })),
            react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["profile-avatar-block__text"] },
                "\u0412\u0430\u0448\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F.",
                react_1["default"].createElement("br", null),
                "\u0420\u0430\u0437\u043C\u0435\u0440 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430",
                react_1["default"].createElement("br", null),
                "\u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 2 \u041C\u0431."),
            react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["profile-avatar-block__btns"] },
                react_1["default"].createElement("input", { ref: myRef, onChange: function (e) {
                        sendAvatar(e.target.files[0]);
                    }, id: "img", type: "file", accept: "image/*,.png,.jpg,.gif,.web" }),
                react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["profile-avatar-block__btn-upload"], htmlFor: "img" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C"),
                react_1["default"].createElement("button", { onClick: function () {
                        deleteImg(pathImg, setPathImg, myRef);
                    }, className: ProfileSettings_module_css_1["default"]["profile-avatar-block__btn-delete"] }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"))),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: ProfileSettings_module_css_1["default"]["input-group"] },
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u0418\u043C\u044F"),
            react_1["default"].createElement("input", { className: errors.name && touched.name
                    ? ProfileSettings_module_css_1["default"]["form-control-error"]
                    : ProfileSettings_module_css_1["default"]["form-control"], type: "text", id: "name", value: name, onChange: function (e) {
                    handleChange(e);
                    setName(e.target.value);
                }, onBlur: handleBlur }),
            errors.name && touched.name ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, errors.name)) : (""),
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u0424\u0430\u043C\u0438\u043B\u0438\u044F"),
            react_1["default"].createElement("input", { className: errors.lastName && touched.lastName
                    ? ProfileSettings_module_css_1["default"]["form-control-error"]
                    : ProfileSettings_module_css_1["default"]["form-control"], type: "text", id: "lastName", value: lastName, onChange: function (e) {
                    handleChange(e);
                    setLastName(e.target.value);
                }, onBlur: handleBlur }),
            errors.lastName && touched.lastName ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, errors.lastName)) : (""),
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u041A\u0440\u0430\u0442\u043A\u043E \u043E \u0441\u0435\u0431\u0435"),
            react_1["default"].createElement("input", { className: errors.brieflyAboutYourself && touched.brieflyAboutYourself
                    ? ProfileSettings_module_css_1["default"]["form-control-error"]
                    : ProfileSettings_module_css_1["default"]["form-control"], type: "text", id: "brieflyAboutYourself", value: brieflyAboutYourself, onChange: function (e) {
                    handleChange(e);
                    setBrieflyAboutYourself(e.target.value);
                }, onBlur: handleBlur }),
            errors.brieflyAboutYourself && touched.brieflyAboutYourself ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, errors.brieflyAboutYourself)) : (""),
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u041E \u0441\u0435\u0431\u0435"),
            react_1["default"].createElement("textarea", { className: errors.aboutMySelf && touched.aboutMySelf
                    ? ProfileSettings_module_css_1["default"]["form-control-error"]
                    : ProfileSettings_module_css_1["default"]["form-control"], value: aboutMySelf, id: "aboutMySelf", onChange: function (e) {
                    handleChange(e);
                    setAboutMySelf(e.target.value);
                }, onBlur: handleBlur }),
            errors.aboutMySelf && touched.aboutMySelf ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, errors.aboutMySelf)) : (""),
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u041C\u043E\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"),
            react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["form-control__select-block"] },
                react_1["default"].createElement("select", { value: contacts, onChange: function (e) {
                        handleChange(e);
                        setContacts(e.target.value);
                        setLinkContactsValue("");
                        resetContacts(e.target.value, setLinkContactsValue);
                    }, onBlur: handleBlur, className: ProfileSettings_module_css_1["default"]["form-control__select"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-sml"], id: "contacts" },
                    react_1["default"].createElement("option", { value: "Контакты" }, "Ko\u043D\u0442\u0430\u043A\u0442\u044B"),
                    react_1["default"].createElement("option", { value: "Vkontakte" }, "Vkontakte"),
                    react_1["default"].createElement("option", { value: "Githab" }, "Githab"),
                    react_1["default"].createElement("option", { value: "E-mail" }, "E-mail")),
                react_1["default"].createElement("input", { className: errors.linkToContacts &&
                        touched.linkToContacts &&
                        contacts !== "Контакты"
                        ? ProfileSettings_module_css_1["default"]["form-control-error"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-lrg"]
                        : ProfileSettings_module_css_1["default"]["form-control"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-lrg"], onChange: function (e) {
                        handleChange(e);
                        setLinkContactsValue(e.target.value);
                    }, onBlur: handleBlur, id: "linkToContacts", type: "text", placeholder: contacts !== "Контакты"
                        ? "Вставьте ссылку на контакты"
                        : "Выберите контакт", value: linkContactsValue, disabled: contacts === "Контакты" ? true : false })),
            errors.linkToContacts &&
                touched.linkToContacts &&
                contacts !== "Контакты" ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, errors.linkToContacts)) : (""),
            contacts !== "Контакты" && linkContactsValue === "" ? (react_1["default"].createElement("span", { className: ProfileSettings_module_css_1["default"]["form-control-error__text"] }, "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u043B\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F")) : (""),
            react_1["default"].createElement("label", { className: ProfileSettings_module_css_1["default"]["form-label"] }, "\u041C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),
            react_1["default"].createElement("div", { className: ProfileSettings_module_css_1["default"]["form-control__select-block"] },
                react_1["default"].createElement("select", { id: "country", value: country, onChange: function (e) {
                        handleChange(e);
                        setCountry(e.target.value);
                        locationCheck(e.target.value);
                    }, onBlur: handleBlur, className: ProfileSettings_module_css_1["default"]["form-control__select"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-md"] },
                    react_1["default"].createElement("option", { value: "Страна" }, "\u0421\u0442\u0440\u0430\u043D\u0430"),
                    react_1["default"].createElement("option", { value: "Россия" }, "\u0420\u043E\u0441\u0441\u0438\u044F")),
                react_1["default"].createElement("select", { className: ProfileSettings_module_css_1["default"]["form-control__select"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-md"], id: "region", value: region, onChange: function (e) {
                        handleChange(e);
                        setRegion(e.target.value);
                        locationCheck(e.target.value);
                    }, onBlur: handleBlur, disabled: country === "Страна" ? true : false },
                    react_1["default"].createElement("option", { value: "Регион" }, "\u0420\u0435\u0433\u0438\u043E\u043D"),
                    react_1["default"].createElement("option", { value: "Московская область" }, "\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C")),
                react_1["default"].createElement("select", { id: "town", value: town, onChange: function (e) {
                        handleChange(e);
                        setTown(e.target.value);
                    }, onBlur: handleBlur, className: ProfileSettings_module_css_1["default"]["form-control__select"] + " " + ProfileSettings_module_css_1["default"]["form-control__select_wd-md"], disabled: region === "Регион" ? true : false },
                    react_1["default"].createElement("option", { value: "Город" }, "\u0413\u043E\u0440\u043E\u0434"),
                    react_1["default"].createElement("option", { value: "Дубна" }, "\u0414\u0443\u0431\u043D\u0430"))),
            react_1["default"].createElement("button", { type: "submit", className: ProfileSettings_module_css_1["default"]["btn"] },
                react_1["default"].createElement("span", null,
                    "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
                    react_1["default"].createElement("br", null),
                    " \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F")))));
};
exports["default"] = ProfileSettings;
