"use strict";
exports.__esModule = true;
exports.schemaForSignUp = void 0;
var yup = require("yup");
exports.schemaForSignUp = yup.object().shape({
    email: yup
        .string()
        .email("Пожалуйста введите корректный адресс электронной почты")
        .required("Введите электронную почту"),
    nickName: yup
        .string()
        .min(4, "Никнэйм должен быть длиннее 4 символов")
        .required("Введите Никнэйм"),
    password: yup
        .string()
        .min(4, "Пароль должен быть длиннее 4 символов")
        .required("Введите пароль"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароль не совпадает")
        .required("Повторите пароль")
});
