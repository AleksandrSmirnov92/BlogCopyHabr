"use strict";
exports.__esModule = true;
exports.schemaForAskQuestions = void 0;
var yup = require("yup");
var upperCase = /(^[А-Я])/;
var questionMarkAtTheEnd = /(\?$)/;
exports.schemaForAskQuestions = yup.object().shape({
    question_title: yup
        .string()
        .matches(upperCase, "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы")
        .min(15, "Заголовок вопроса не может быть менее 15 и более 150 символов")
        .matches(questionMarkAtTheEnd, "Переформулируйте вопрос так, чтобы он заканчивался знаком вопроса")
        .required("Это обязательное поле"),
    question_tags: yup.string().max(10, "Название тега слишком длинное"),
    question_details: yup
        .string()
        .matches(upperCase, "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы")
        .min(30, "Текст вопроса не может быть менее 30 и более 10 тысяч символов")
        .required("Это обязательное поле")
});
