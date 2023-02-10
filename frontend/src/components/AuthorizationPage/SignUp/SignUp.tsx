import React, { useState } from "react";

import { useFormik, FormikValues } from "formik";
import { schemaForSignUp } from "../../Schemas/SchemaSignUp";
import { NavLink } from "react-router-dom";
import SignUpCSS from "./SignUp.module.css";
interface MyValues {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}
interface Error {
  status: string;
  message: string;
}
const SignUp = () => {
  const [error, setError] = useState<Error>({ status: "", message: "" });
  const onSubmit = async (values: MyValues, actions: FormikValues) => {
    fetch("/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        nickName: values.nickName,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "SUCCESS") {
          setTimeout(() => {
            window.location.href = "http://localhost:3000/myFeed";
          }, 1000);
          let date = new Date();
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
          document.cookie = `nickname=${response.nickName};max-age=${date}`;
          localStorage.setItem(
            "userId",
            JSON.stringify(Number(response.userId))
          );
          console.log(response.message);
        }
        if (response.status === "ERROR") {
          setError({ status: response.status, message: response.message });
          setTimeout(() => {
            setError({
              status: ``,
              message: ``,
            });
          }, 1500);
        }
      });
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<MyValues>({
    initialValues: {
      email: "",
      nickName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: schemaForSignUp,
  });

  return (
    <div className={SignUpCSS.container}>
      <header className={SignUpCSS.header}>
        <h1>
          Смир <span> Акаунт</span>
        </h1>
      </header>
      <main className={SignUpCSS.main_block}>
        <form onSubmit={handleSubmit} className={SignUpCSS.input_group}>
          <h2>Регистрация</h2>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? SignUpCSS.form_control__error
                : SignUpCSS.form_control
            }
          />
          {errors.email && touched.email ? (
            <span className={SignUpCSS.form_control__error__message}>
              {errors.email}
            </span>
          ) : (
            ""
          )}
          <label htmlFor="nickName">Никнэйм</label>
          <input
            type="text"
            id="nickName"
            value={values.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.nickName && touched.nickName
                ? SignUpCSS.form_control__error
                : SignUpCSS.form_control
            }
          />
          {errors.nickName && touched.nickName ? (
            <span className={SignUpCSS.form_control__error__message}>
              {errors.nickName}
            </span>
          ) : (
            ""
          )}
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? SignUpCSS.form_control__error
                : SignUpCSS.form_control
            }
          />
          {errors.password && touched.password ? (
            <span className={SignUpCSS.form_control__error__message}>
              {errors.password}
            </span>
          ) : (
            ""
          )}
          <label htmlFor="confirmPassword">Пароль еще раз</label>
          <input
            type="password"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? SignUpCSS.form_control__error
                : SignUpCSS.form_control
            }
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <span className={SignUpCSS.form_control__error__message}>
              {errors.confirmPassword}
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={
              error.status === "ERROR"
                ? SignUpCSS.error__server
                : SignUpCSS.form_control_button
            }
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </button>
          {error.status === "ERROR" ? (
            <span className={SignUpCSS.error__server_message}>
              {error.message}
            </span>
          ) : (
            ""
          )}
        </form>
        <div className={SignUpCSS.button_registration}>
          <span>Уже зарегестрированы?</span>
          <NavLink to="/SignIn">Войдите</NavLink>
        </div>
      </main>
    </div>
  );
};
export default SignUp;
