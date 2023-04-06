import React, { useState } from "react";
import { FormikValues, useFormik } from "formik";
import { schemaForSignIn } from "../../Schemas/ShemaSignIn";
import { NavLink } from "react-router-dom";
import AccountCSS from "./SignIn.module.css";

interface MyValues {
  email: string;
  password: string;
}
interface State {
  status: string;
  message: string;
}

const SignIn: React.FC = () => {
  const [error, setError] = useState<State>({ status: "", message: "" });
  const onSubmit = async (values: MyValues, actions: FormikValues) => {
    fetch("/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
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
          document.cookie = `nickname=${response.user.nickname};max-age=${date}`;
          localStorage.setItem(
            "userId",
            JSON.stringify(Number(response.user.user_id))
          );
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
      password: "",
    },
    onSubmit,
    validationSchema: schemaForSignIn,
  });
  return (
    <div className={AccountCSS["form-container"]}>
      <header className={AccountCSS["header"]}>
        <h1 className={AccountCSS["header__title"]}>
          Смир <span> Аккаунт</span>
        </h1>
      </header>
      <main className={AccountCSS["main-container"]}>
        <form
          onSubmit={handleSubmit}
          className={`${AccountCSS["input-group"]} ${AccountCSS["input-group_outline"]} ${AccountCSS["input-group_p"]}`}
        >
          <h2>Вход</h2>
          <label className={AccountCSS["form-label"]} htmlFor="email">
            <span
              className={`${AccountCSS["form-label__text"]} ${AccountCSS["form-label__text_color-black"]} ${AccountCSS["form-label__text_size"]}`}
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
                ? `${AccountCSS["form-control-error"]} ${AccountCSS["form-control-error_outline"]} ${AccountCSS["form-control-error_p"]}`
                : `${AccountCSS["form-control"]} ${AccountCSS["form-control_outline"]} ${AccountCSS["form-control_p"]}`
            }
          />
          {errors.email && touched.email ? (
            <span
              className={`${AccountCSS["form-control-error__text"]} ${AccountCSS["form-control-error__text_color-red"]} ${AccountCSS["form-control-error__text_size"]}`}
            >
              {errors.email}
            </span>
          ) : (
            ""
          )}
          <label className={AccountCSS["form-label"]} htmlFor="password">
            <span
              className={`${AccountCSS["form-label__text"]} ${AccountCSS["form-label__text_color-black"]} ${AccountCSS["form-label__text_size"]}`}
            >
              Пароль
            </span>
          </label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? `${AccountCSS["form-control-error"]} ${AccountCSS["form-control-error_outline"]} ${AccountCSS["form-control-error_p"]}`
                : `${AccountCSS["form-control"]} ${AccountCSS["form-control_outline"]} ${AccountCSS["form-control_p"]}`
            }
          />
          {errors.password && touched.password ? (
            <span
              className={`${AccountCSS["form-control-error__text"]} ${AccountCSS["form-control-error__text_color-red"]} ${AccountCSS["form-control-error__text_size"]}`}
            >
              {errors.password}
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={
              error.status === "ERROR"
                ? `${AccountCSS["form-control-error-server"]} ${AccountCSS["form-control-error-server_outline"]} ${AccountCSS["form-control-error-server_p"]} ${AccountCSS["form-control-error-server_color"]}`
                : `${AccountCSS["form-control-button"]} ${AccountCSS["form-control-button_outline"]} ${AccountCSS["form-control-button_p"]}`
            }
            disabled={isSubmitting}
          >
            <span
              className={`${AccountCSS["form-control-button__text"]} ${AccountCSS["form-control-button__text_color"]}`}
            >
              Войти
            </span>
          </button>
          {error.status === "ERROR" ? (
            <span className={AccountCSS["form-control-error-server__text"]}>
              {error.message}
            </span>
          ) : (
            ""
          )}
        </form>
        <div
          className={`${AccountCSS["button-registration"]} ${AccountCSS["button-registration_outline"]} ${AccountCSS["button-registration_p"]}`}
        >
          <span className={`${AccountCSS["button-registration__text"]}`}>
            Еще нет аккаунта?
          </span>
          <NavLink
            className={`${AccountCSS["button-registration__link"]}`}
            to="/SignUp"
          >
            Зарегистрируйтесь
          </NavLink>
        </div>
      </main>
    </div>
  );
};
export default SignIn;
