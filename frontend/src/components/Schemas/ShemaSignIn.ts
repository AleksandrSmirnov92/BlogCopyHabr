import * as yup from "yup";

export const schemaForSignIn = yup.object().shape({
  email: yup
    .string()
    .email("Пожалуйста введите корректный адресс электронной почты")
    .required("Введите электронную почту"),
  password: yup
    .string()
    .min(4, "Пароль должен быть длиннее 4 символов")
    .required("Введите пароль"),
});
