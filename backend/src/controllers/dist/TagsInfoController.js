"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.getInfoTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getTagsData, countFollowersJavaScript, countFollowersHTML, countFollowersCSS, countFollowersReact, countFollowersVue, countFollowersGit, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = req.params.id;
                getTagsData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var getFollowers, countFollowers, getFollowersData, _a, data, error, getTags;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                countFollowers = function (tagsId) { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a, data, error;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                                    .from("questions")
                                                    .select("*", { count: "exact" })
                                                    .match({ question_tags: tagsId })];
                                            case 1:
                                                _a = _b.sent(), data = _a.data, error = _a.error;
                                                if (error) {
                                                    console.log(error);
                                                }
                                                if (!data) return [3 /*break*/, 3];
                                                return [4 /*yield*/, "" + data.length];
                                            case 2: return [2 /*return*/, _b.sent()];
                                            case 3: return [4 /*yield*/, "0"];
                                            case 4: return [2 /*return*/, _b.sent()];
                                        }
                                    });
                                }); };
                                getFollowersData = function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a, data, error;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase.from("followers").select("*")];
                                            case 1:
                                                _a = _b.sent(), data = _a.data, error = _a.error;
                                                // getFollowers = data;
                                                if (error) {
                                                    console.log(error);
                                                }
                                                if (!data) return [3 /*break*/, 3];
                                                return [4 /*yield*/, data];
                                            case 2:
                                                getFollowers = _b.sent();
                                                return [2 /*return*/, getFollowers];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); };
                                if (!(id !== "null")) return [3 /*break*/, 4];
                                return [4 /*yield*/, getFollowersData()];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, usersDataBase_js_1.supabase
                                        .from("tags")
                                        .select("tags_id,name_tag,img_tag")];
                            case 2:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (!data) return [3 /*break*/, 4];
                                getTags = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                    var newob, _i, data_1, item, _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                newob = [];
                                                _i = 0, data_1 = data;
                                                _e.label = 1;
                                            case 1:
                                                if (!(_i < data_1.length)) return [3 /*break*/, 4];
                                                item = data_1[_i];
                                                _b = (_a = newob).push;
                                                _c = [__assign(__assign({}, item), getFollowers[0])];
                                                _d = {};
                                                return [4 /*yield*/, countFollowers(item.tags_id)];
                                            case 2:
                                                _b.apply(_a, [__assign.apply(void 0, _c.concat([(_d.count = _e.sent(), _d)]))]);
                                                _e.label = 3;
                                            case 3:
                                                _i++;
                                                return [3 /*break*/, 1];
                                            case 4: return [2 /*return*/, newob];
                                        }
                                    });
                                }); };
                                return [4 /*yield*/, getTags(data)];
                            case 3: return [2 /*return*/, _b.sent()];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersJavaScript = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("javascript", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersHTML = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("html", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersCSS = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("css", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersReact = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("react", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersVue = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("vue", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                countFollowersGit = function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .eq("git", t)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                _b = (_a = res.status(200)).json;
                _c = {
                    message: "Вы получили информацию о всех тегах"
                };
                return [4 /*yield*/, getTagsData(id)];
            case 1:
                _c.tags = _e.sent();
                _d = {};
                return [4 /*yield*/, countFollowersJavaScript("true")];
            case 2:
                _d.JavaScript = _e.sent();
                return [4 /*yield*/, countFollowersHTML("true")];
            case 3:
                _d.HTML = _e.sent();
                return [4 /*yield*/, countFollowersCSS("true")];
            case 4:
                _d.CSS = _e.sent();
                return [4 /*yield*/, countFollowersReact("true")];
            case 5:
                _d.React = _e.sent();
                return [4 /*yield*/, countFollowersVue("true")];
            case 6:
                _d.Vue = _e.sent();
                return [4 /*yield*/, countFollowersGit("true")];
            case 7:
                _b.apply(_a, [(_c.countFollowers = (_d.Git = _e.sent(),
                        _d),
                        _c)]);
                return [2 /*return*/];
        }
    });
}); };
