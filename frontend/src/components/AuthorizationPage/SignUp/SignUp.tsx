import React from "react";
import { NavLink } from "react-router-dom";
import SignUpCSS from "./SignUp.module.css";
const SignUp = () => {
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
          <form>
            <h2>Регистрация</h2>
            <label className={SignUpCSS.email}>E-mail</label>
            <input type="email" id="email" />
            <label className={SignUpCSS.nickName}>Никнэйм</label>
            <input type="email" id="email" />
            <label>Пароль</label>
            <input type="password" id="password" />
            <label>Пароль еще раз</label>
            <input type="password" id="password" />
            <button className={SignUpCSS.button} disabled>
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
