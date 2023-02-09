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
    <div className={AccountCSS.container}>
      <header className={AccountCSS.header}>
        <h1>
          Смир <span className={AccountCSS.headerAccount}> Акаунт</span>
        </h1>
      </header>
      <main className={AccountCSS.main_block}>
        <form onSubmit={handleSubmit} className={AccountCSS.input_group}>
          <h2>Вход</h2>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? AccountCSS.form_control__error
                : AccountCSS.form_control
            }
          />
          {errors.email && touched.email ? (
            <span className={AccountCSS.form_control__error__message}>
              {errors.email}
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
                ? AccountCSS.form_control__error
                : AccountCSS.form_control
            }
          />
          {errors.password && touched.password ? (
            <span className={AccountCSS.form_control__error__message}>
              {errors.password}
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={
              error.status === "ERROR"
                ? AccountCSS.error__server
                : AccountCSS.form_control_button
            }
            disabled={isSubmitting}
          >
            Войти
          </button>
          {error.status === "ERROR" ? (
            <span className={AccountCSS.error__server_message}>
              {error.message}
            </span>
          ) : (
            ""
          )}
        </form>
        <div className={AccountCSS.button_registration}>
          <span>Еще нет аккаунта?</span>
          <NavLink to="/SignUp">Зарегистрируйтесь</NavLink>
        </div>
      </main>
    </div>
  );
};
export default SignIn;
