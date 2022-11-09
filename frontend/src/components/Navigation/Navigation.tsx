import React from "react";
import NavigationCSS from "./Navigation.module.css";
import signInIMG from "../../images/signIn.png";
import allQuestionsIMG from "../../images/allQuestions.png";
import ExitIMG from "../../images/Exit.png";
import SettingsIMG from "../../images/Settings.png";
import allTagsIMG from "../../images/allTags.png";
import usersIMG from "../../images/users.png";
import myProfile from "../../images/photoProfil.png";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className={NavigationCSS.navigation}>
      <ul>
        {/* 
        <li className={NavigationCSS.myProfile}>
          <a href="#" className={NavigationCSS.photoProfil}>
            <img src={myProfile} className={NavigationCSS.photoProfil} />
          </a>
          <a href="#" className={NavigationCSS.textProfil}>
            Александр Смирнов
          </a>
        </li>
        <li className={NavigationCSS.settings}>
          <img src={SettingsIMG} alt="" />
          <NavLink
            to="./settingsProfil"
            className={(NavigationCSS.settings, NavigationCSS.textProfil)}
          >
            Настройки
          </NavLink>
        </li>
        <li className={NavigationCSS.exit}>
          <img src={ExitIMG} alt="" />
          <NavLink
            to="./questions"
            className={(NavigationCSS.allQuestions, NavigationCSS.textProfil)}
          >
            Выход
          </NavLink>
        </li> */}
        <li className={NavigationCSS.signIn}>
          <img src={signInIMG} alt="" />
          <a
            href="http://localhost:3001/account"
            className={NavigationCSS.signIn}
          >
            Войти на сайт
          </a>
        </li>
        <li className={NavigationCSS.allQuestions}>
          <img src={allQuestionsIMG} alt="" />
          <NavLink
            to="./questions"
            className={(NavigationCSS.allQuestions, NavigationCSS.text)}
          >
            Все вопросы
          </NavLink>
        </li>
        <li className={NavigationCSS.allTags}>
          <img src={allTagsIMG} alt="" />
          <NavLink
            to="./tags"
            className={(NavigationCSS.allTags, NavigationCSS.text)}
          >
            Все теги
          </NavLink>
        </li>
        <li className={NavigationCSS.users}>
          <img src={usersIMG} alt="" />
          <NavLink
            to="./users"
            className={(NavigationCSS.users, NavigationCSS.text)}
          >
            Пользователи
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
