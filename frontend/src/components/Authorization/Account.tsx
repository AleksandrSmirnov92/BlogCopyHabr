import React from "react";
import AccountCSS from "./Account.module.css";
const Account = () => {
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
            <a href="#" className={AccountCSS.registrationText}>
              Зарегистрируйтесь
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Account;
