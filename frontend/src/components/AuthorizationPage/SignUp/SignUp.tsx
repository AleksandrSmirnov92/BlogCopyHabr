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
const SignUp: React.FC = () => {
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
    <div className={`${SignUpCSS["form-container"]}`}>
      <header className={`${SignUpCSS["header"]} ${SignUpCSS["header_p"]}`}>
        <h1 className={SignUpCSS["header__title"]}>
          Смир <span> Акаунт</span>
        </h1>
      </header>
      <main className={SignUpCSS["main-container"]}>
        <form
          onSubmit={handleSubmit}
          className={`${SignUpCSS["input-group"]} ${SignUpCSS["input-group_outline"]} ${SignUpCSS["input-group_p"]}`}
        >
          <h2>Регистрация</h2>
          <label className={`${SignUpCSS["form-label"]}`} htmlFor="email">
            <span
              className={`${SignUpCSS["form-label__text"]} ${SignUpCSS["form-label__text_color-black"]} ${SignUpCSS["form-label__text_size"]}`}
            >
              E-mail
            </span>
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? `${SignUpCSS["form-control-error"]} ${SignUpCSS["form-control-error_outline"]} ${SignUpCSS["form-control-error_p"]}`
                : `${SignUpCSS["form-control"]} ${SignUpCSS["form-control_outline"]} ${SignUpCSS["form-control_p"]}`
            }
          />
          {errors.email && touched.email ? (
            <span
              className={`${SignUpCSS["form-control-error__text"]} ${SignUpCSS["form-control-error__text_color-red"]} ${SignUpCSS["form-control-error__text_size"]}`}
            >
              {errors.email}
            </span>
          ) : (
            ""
          )}
          <label className={`${SignUpCSS["form-label"]}`} htmlFor="nickName">
            <span
              className={`${SignUpCSS["form-label__text"]} ${SignUpCSS["form-label__text_color-black"]} ${SignUpCSS["form-label__text_size"]}`}
            >
              Никнэйм
            </span>{" "}
          </label>
          <input
            type="text"
            id="nickName"
            value={values.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.nickName && touched.nickName
                ? `${SignUpCSS["form-control-error"]} ${SignUpCSS["form-control-error_outline"]} ${SignUpCSS["form-control-error_p"]}`
                : `${SignUpCSS["form-control"]} ${SignUpCSS["form-control_outline"]} ${SignUpCSS["form-control_p"]}`
            }
          />
          {errors.nickName && touched.nickName ? (
            <span
              className={`${SignUpCSS["form-control-error__text"]} ${SignUpCSS["form-control-error__text_color-red"]} ${SignUpCSS["form-control-error__text_size"]}`}
            >
              {errors.nickName}
            </span>
          ) : (
            ""
          )}
          <label className={`${SignUpCSS["form-label"]}`} htmlFor="password">
            {" "}
            <span
              className={`${SignUpCSS["form-label__text"]} ${SignUpCSS["form-label__text_color-black"]} ${SignUpCSS["form-label__text_size"]}`}
            >
              Пароль
            </span>{" "}
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? `${SignUpCSS["form-control-error"]} ${SignUpCSS["form-control-error_outline"]} ${SignUpCSS["form-control-error_p"]}`
                : `${SignUpCSS["form-control"]} ${SignUpCSS["form-control_outline"]} ${SignUpCSS["form-control_p"]}`
            }
          />
          {errors.password && touched.password ? (
            <span
              className={`${SignUpCSS["form-control-error__text"]} ${SignUpCSS["form-control-error__text_color-red"]} ${SignUpCSS["form-control-error__text_size"]}`}
            >
              {errors.password}
            </span>
          ) : (
            ""
          )}
          <label
            className={`${SignUpCSS["form-label"]}`}
            htmlFor="confirmPassword"
          >
            <span
              className={`${SignUpCSS["form-label__text"]} ${SignUpCSS["form-label__text_color-black"]} ${SignUpCSS["form-label__text_size"]}`}
            >
              Пароль еще раз
            </span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? `${SignUpCSS["form-control-error"]} ${SignUpCSS["form-control-error_outline"]} ${SignUpCSS["form-control-error_p"]}`
                : `${SignUpCSS["form-control"]} ${SignUpCSS["form-control_outline"]} ${SignUpCSS["form-control_p"]}`
            }
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <span
              className={`${SignUpCSS["form-control-error__text"]} ${SignUpCSS["form-control-error__text_color-red"]} ${SignUpCSS["form-control-error__text_size"]}`}
            >
              {errors.confirmPassword}
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={
              error.status === "ERROR"
                ? `${SignUpCSS["form-control-error-server"]} ${SignUpCSS["form-control-error-server_outline"]} ${SignUpCSS["form-control-error-server_p"]} ${SignUpCSS["form-control-error-server_color"]}`
                : `${SignUpCSS["form-control-button"]} ${SignUpCSS["form-control-button_outline"]} ${SignUpCSS["form-control-button_p"]}`
            }
            disabled={isSubmitting}
          >
            <span
              className={`${SignUpCSS["form-control-button__text"]} ${SignUpCSS["form-control-button__text_color"]}`}
            >
              Зарегистрироваться
            </span>
          </button>
          {error.status === "ERROR" ? (
            <span className={SignUpCSS["form-control-error-server__text"]}>
              {error.message}
            </span>
          ) : (
            ""
          )}
        </form>
        <div
          className={`${SignUpCSS["button-come"]} ${SignUpCSS["button-come_outline"]} ${SignUpCSS["button-come_p"]}`}
        >
          <span className={`${SignUpCSS["button-come__text"]}`}>
            Уже зарегестрированы?
          </span>
          <NavLink className={`${SignUpCSS["button-come__link"]}`} to="/SignIn">
            Войдите
          </NavLink>
        </div>
      </main>
    </div>
  );
};
export default SignUp;
