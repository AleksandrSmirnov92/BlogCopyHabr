import * as yup from "yup";
const upperCase = /(^[А-Я])/;
export const schemaAnswers = yup.object().shape({
  answers: yup
    .string()
    .matches(
      upperCase,
      "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы"
    ),
});
