import * as yup from "yup";
const upperCase = /(^[А-Я])/;
const questionMarkAtTheEnd = /(\?$)/;
export const schemaForAskQuestions = yup.object().shape({
  questionHeader: yup
    .string()
    .matches(
      upperCase,
      "По правилам русского языка заголовок (и каждое новое предложение) начинается с заглавной буквы"
    )
    .min(15, "Заголовок вопроса не может быть менее 15 и более 150 символов")
    .matches(
      questionMarkAtTheEnd,
      "Переформулируйте вопрос так, чтобы он заканчивался знаком вопроса"
    )
    .required("Это обязательное поле"),
  questionTags: yup.string(),
  questionDetails: yup
    .string()
    .min(30, "Текст вопроса не может быть менее 30 и более 10 тысяч символов")
    .required("Это обязательное поле"),
});
