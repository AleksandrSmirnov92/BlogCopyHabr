import React from "react";
import { useFormik } from "formik";
import { schemaForSignUp } from "../Schemas/Schema";
import { NavLink } from "react-router-dom";
import SignUpCSS from "./SignUp.module.css";
interface MyValues {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}
const onSubmit = async (values: MyValues, actions: any) => {
  fetch("http://localhost:5000/signUp", {
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
          window.location.href = "http://localhost:3000/";
        }, 1000);
        console.log(response.newUser);
      } else {
        console.log(response.error);
      }
    });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};
const SignUp = () => {
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
        <div className={SignUpCSS.headerText}>
          <h1 className={SignUpCSS.headerH1}>Смир</h1>
          <h1 className={SignUpCSS.headerAccount}>Акаунт</h1>
        </div>
      </header>
      <main className={SignUpCSS.Main}>
        <div className={SignUpCSS.containerMain}>
          <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <label htmlFor="email" className={SignUpCSS.email}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? SignUpCSS.inputError : ""
              }
            />
            {errors.email && touched.email ? (
              <span className={SignUpCSS.error}>{errors.email}</span>
            ) : (
              ""
            )}
            <label htmlFor="nickName" className={SignUpCSS.nickName}>
              Никнэйм
            </label>
            <input
              type="text"
              id="nickName"
              value={values.nickName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.nickName && touched.nickName ? SignUpCSS.inputError : ""
              }
            />
            {errors.nickName && touched.nickName ? (
              <span className={SignUpCSS.error}>{errors.nickName}</span>
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
                errors.password && touched.password ? SignUpCSS.inputError : ""
              }
            />
            {errors.password && touched.password ? (
              <span className={SignUpCSS.error}>{errors.password}</span>
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
                  ? SignUpCSS.inputError
                  : ""
              }
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <span className={SignUpCSS.error}>{errors.confirmPassword}</span>
            ) : (
              ""
            )}
            <button
              type="submit"
              className={SignUpCSS.button}
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </form>
          <div className={SignUpCSS.questionAboutRegestration}>
            <span>Уже зарегестрированы?</span>
            <NavLink to="/SignIn" className={SignUpCSS.registrationText}>
              Войдите
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignUp;
