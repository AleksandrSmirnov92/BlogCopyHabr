import React from "react";
import { useFormik } from "formik";
import { schemaForSignIn } from "../Schemas/ShemaSignIn";
import { NavLink } from "react-router-dom";
import AccountCSS from "./SignIn.module.css";
interface MyValues {
  email: string;
  password: string;
}
const onSubmit = async (values: MyValues, actions: any) => {
  fetch("http://localhost:5000/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};
const SignIn = () => {
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
        <div className={AccountCSS.headerText}>
          <h1 className={AccountCSS.headerH1}>Смир</h1>
          <h1 className={AccountCSS.headerAccount}>Акаунт</h1>
        </div>
      </header>
      <main className={AccountCSS.Main}>
        <div className={AccountCSS.containerMain}>
          <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <label htmlFor="email" className={AccountCSS.email}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? AccountCSS.inputError : ""
              }
            />
            {errors.email && touched.email ? (
              <span className={AccountCSS.error}>{errors.password}</span>
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
                errors.password && touched.password ? AccountCSS.inputError : ""
              }
            />
            {errors.password && touched.password ? (
              <span className={AccountCSS.error}>{errors.password}</span>
            ) : (
              ""
            )}
            <button
              type="submit"
              className={AccountCSS.button}
              disabled={isSubmitting}
            >
              Войти
            </button>
          </form>
          <div className={AccountCSS.questionAboutRegestration}>
            <span>Еще нет аккаунта?</span>
            <NavLink to="/SignUp" className={AccountCSS.registrationText}>
              Зарегистрируйтесь
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignIn;
