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
// import { pool } from "../db.js";
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.tagInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nameTag, id, countFollowers, getAnswers, questionTag, _a, data, error, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = req.params.id;
                countFollowers = function (nameTag) { return __awaiter(void 0, void 0, void 0, function () {
                    var countFollowersData, _a, data, error;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("followers")
                                    .select("*", { count: "exact" })
                                    .match((_b = {}, _b[nameTag] = true, _b))];
                            case 1:
                                _a = _c.sent(), data = _a.data, error = _a.error;
                                if (data) {
                                    return [2 /*return*/, countFollowersData = "" + data.length];
                                }
                                else {
                                    return [2 /*return*/, countFollowersData = "0"];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                getAnswers = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase.from("answers").select("*")];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    return [2 /*return*/, data];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                questionTag = function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, data, error, newob;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersDataBase_js_1.supabase
                                    .from("questions")
                                    .select("\"*\",tags(\"*\")")
                                    .eq("question_tags", id)];
                            case 1:
                                _a = _b.sent(), data = _a.data, error = _a.error;
                                if (error) {
                                    console.log(error);
                                }
                                if (data) {
                                    newob = data.map((function (item) { return (__assign(__assign({}, item), item.tags)); }));
                                    return [2 /*return*/, newob];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("tags")
                        .select()
                        .eq("tags_id", id)
                        .single()];
            case 1:
                _a = _e.sent(), data = _a.data, error = _a.error;
                return [4 /*yield*/, data.name_tag.toLowerCase()];
            case 2:
                nameTag = _e.sent();
                if (error) {
                    console.log(error);
                }
                if (!data) return [3 /*break*/, 6];
                _c = (_b = res.status(200)).json;
                _d = {
                    message: "Вы получили информацию о тэге",
                    body: data
                };
                return [4 /*yield*/, countFollowers(nameTag)];
            case 3:
                _d.countFollowers = _e.sent();
                return [4 /*yield*/, questionTag(id)];
            case 4:
                _d.questionsTag = _e.sent();
                return [4 /*yield*/, getAnswers()];
            case 5:
                _c.apply(_b, [(_d.answers = _e.sent(),
                        _d)]);
                _e.label = 6;
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); };
