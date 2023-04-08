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
// import { pool } from "../db.js";
var usersDataBase_js_1 = require("../config/usersDataBase.js");
exports.signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, nickName, password, _b, data, error, dataFromUsers, _c, data_1, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, nickName = _a.nickName, password = _a.password;
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("users")
                        .insert({ email: email, nickname: nickName, password: password })
                        .select()];
            case 1:
                _b = _d.sent(), data = _b.data, error = _b.error;
                return [4 /*yield*/, data[0].user_id];
            case 2:
                dataFromUsers = _d.sent();
                if (error) {
                    console.log(error);
                    return [2 /*return*/, res.status(406).json({
                            status: "ERROR",
                            message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C c \u0442\u0430\u043A\u0438\u043C E-mail(" + email + ") \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
                        })];
                }
                if (!data) return [3 /*break*/, 4];
                return [4 /*yield*/, usersDataBase_js_1.supabase
                        .from("about_user")
                        .insert({
                        user_id_from_users: dataFromUsers,
                        img: "",
                        fullname: "",
                        lastname: "",
                        contacts: "Контакты",
                        linktocontacts: "",
                        briefly_about_yourself: "",
                        informattion_about_user: "",
                        country: "Страна",
                        region: "Регион",
                        town: "Город"
                    })];
            case 3:
                _c = _d.sent(), data_1 = _c.data, error_1 = _c.error;
                return [2 /*return*/, res.status(200).json({
                        status: "SUCCESS",
                        nickName: nickName,
                        userId: dataFromUsers
                    })];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
// try {
// Запрос в базу postgresql локальную
// const newUser = await pool.query(
//   "INSERT INTO users (email,nickname,password) VALUES($1, $2, $3) RETURNING * ",
//   [email, nickName, password]
// );
// const addInformationAboutUser = await pool.query(
//   "INSERT INTO about_user (user_id_from_users,img,fullname,lastname,contacts,linktocontacts,briefly_about_yourself,informattion_about_user,country,region,town) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
//   [
//     newUser.rows[0].user_id,
//     "",
//     "",
//     "",
//     "Контакты",
//     "",
//     "",
//     "",
//     "Страна",
//     "Регион",
//     "Город",
//   ]
// );
// return res.status(200).json({
//   status: "SUCCESS",
// nickName: nickName,
// userId: newUser.rows[0].user_id,
// });
// } catch (err: any) {
//   console.log(err.detail);
//   return res.status(406).json({
//     status: "ERROR",
//     message: `Пользователь c таким E-mail(${email}) существует`,
//   });
//   }
// }
