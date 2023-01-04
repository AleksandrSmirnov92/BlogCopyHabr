import React, { useState, useEffect, useContext } from "react";
import NavigationCSS from "./Navigation.module.css";
import signInIMG from "../../../../images/signIn.png";
import allQuestionsIMG from "../../../../images/allQuestions.png";
import userIdContext from "../../../Context/Context";
import ExitIMG from "../../../../images/Exit.png";
import SettingsIMG from "../../../../images/Settings.png";
import allTagsIMG from "../../../../images/allTags.png";
import usersIMG from "../../../../images/users.png";
import myProfile from "../../../../images/photoProfil.png";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  let [userRegistred, setUserRegistred] = useState(false);
  const { userId, setUserId } = useContext(userIdContext);
  const exit = (): any => {
    setTimeout(() => {
      document.cookie = "nickname= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setUserId(localStorage.removeItem("userId"));
      setUserRegistred(false);
    }, 1000);
  };
  useEffect(() => {
    function getCookie(name: string): string {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : "";
    }
    if (getCookie("nickname") !== "") {
      console.log("navigation");
      setUserRegistred(true);
    } else {
      console.log("пользователь не зарегестрирован");
    }
  }, []);
  return (
    <nav className={NavigationCSS.navigation}>
      <ul>
        <div
          className={
            userRegistred
              ? NavigationCSS.registered
              : NavigationCSS.notRegistered
          }
        >
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
              onClick={() => {
                exit();
              }}
            >
              Выход
            </NavLink>
          </li>
          <li className={NavigationCSS.allTags}>
            <img src={allTagsIMG} alt="" />
            <NavLink
              to="./myFeed"
              className={(NavigationCSS.allTags, NavigationCSS.text)}
            >
              Моя лента
            </NavLink>
          </li>
        </div>

        {/* ------------------------------------------------------------------------------ */}
        <div
          className={
            userRegistred
              ? NavigationCSS.notRegistered
              : NavigationCSS.registered
          }
        >
          <li className={NavigationCSS.signIn}>
            <img src={signInIMG} alt="" />
            <NavLink to="/SignIn" className={NavigationCSS.signIn}>
              Войти на сайт
            </NavLink>
          </li>
        </div>
        <li className={NavigationCSS.allQuestions}>
          <img src={allQuestionsIMG} alt="" />
          <NavLink
            to="/questions"
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
