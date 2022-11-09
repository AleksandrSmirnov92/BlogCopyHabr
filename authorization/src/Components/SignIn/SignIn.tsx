import React from "react";
import SignInCSS from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={SignInCSS.container}>
      <header className={SignInCSS.header}>
        <div className={SignInCSS.headerText}>
          <h1 className={SignInCSS.headerH1}>Смир</h1>
          <h1 className={SignInCSS.headerAccount}>Акаунт</h1>
        </div>
      </header>
      <main className={SignInCSS.Main}>
        <div className={SignInCSS.containerMain}>
          <form>
            <h2>Вход</h2>
            <label className={SignInCSS.email}>E-mail</label>
            <input type="email" id="email" />
            <label>Пароль</label>
            <input type="password" id="password" />
            <button className={SignInCSS.button}>Войти</button>
          </form>
          <div className={SignInCSS.questionAboutRegestration}>
            <span>Еще нет аккаунта?</span>
            <a href="#" className={SignInCSS.registrationText}>
              Зарегистрируйтесь
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignIn;
