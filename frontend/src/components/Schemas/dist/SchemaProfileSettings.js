"use strict";
exports.__esModule = true;
exports.schemaForProfileSettings = void 0;
var yup = require("yup");
var upperCase = /(^[А-Я]|[A-Z])/;
exports.schemaForProfileSettings = yup.object().shape({
    name: yup
        .string()
        .trim()
        .matches(upperCase, "По правилам русского языка Имя начинается с заглавной буквы")
        .min(2, "Имя должно быть длиннее чем 2 буквы"),
    lastName: yup
        .string()
        .trim()
        .matches(upperCase, "По правилам русского языка Фамилия начинается с заглавной буквы")
        .min(2, "Фамилия должна быть длиннее чем 2 буквы"),
    brieflyAboutYourself: yup
        .string()
        .trim()
        .matches(upperCase, "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы")
        .min(10, "Поле о 'Кратко о себе' должно содержать минимум 10 символов"),
    aboutMySelf: yup
        .string()
        .trim()
        .matches(upperCase, "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы")
        .min(2, "Поле 'О себе' должно быть длиннее чем 2 символа")
        .max(500, "Поле 'О себе' должна быть менее 500 символов"),
    linkToContacts: yup
        .string()
        .trim()
        .min(2, "Поле 'Контакты' должно содержать минимум 2 символа")
        .max(40, "Поле 'Контакты' должно содержать максимум 40 символов")
});
