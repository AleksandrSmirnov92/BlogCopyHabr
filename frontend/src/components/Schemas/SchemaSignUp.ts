import * as yup from "yup";

export const schemaForSignUp = yup.object().shape({
  email: yup
    .string()
    .email("Пожалуйста введите корректный адресс электронной почты")
    .required("Введите электронную почту"),
  nickName: yup.string().min(4).required("Введите Никнэйм"),
  password: yup.string().min(4).required("Введите пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароль не совпадает")
    .required("Повторите пароль"),
});
