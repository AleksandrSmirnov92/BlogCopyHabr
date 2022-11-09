import React from "react";
import { NavLink } from "react-router-dom";
import AccountCSS from "./SignIn.module.css";
const SignIn = () => {
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
          <form>
            <h2>Вход</h2>
            <label className={AccountCSS.email}>E-mail</label>
            <input type="email" id="email" />
            <label>Пароль</label>
            <input type="password" id="password" />
            <button className={AccountCSS.button}>Войти</button>
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
