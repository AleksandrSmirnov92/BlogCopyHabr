import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import QuestionPanelCSS from "./QuestionPanel.module.css";
import userIdContext from "../../../Context/Context";
import PlusImg from "../../../../images/plus.png";
import SearchImg from "../../../../images/searh.png";
import NavImg from "../../../../images/nav.png";
function getCookie(name: string): RegExp | string {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}
const QuestionPanel = () => {
  const { userId, setUserId } = useContext(userIdContext);
  const [classHideSearch, setClassHideSearch] = useState("hide_search");
  useEffect(() => {
    console.log("question panel");
    setUserId(JSON.parse(localStorage.getItem("userId")));
  });
  return (
    <div className={QuestionPanelCSS.question_panel}>
      <div className={`${QuestionPanelCSS[classHideSearch]}`}>
        <input
          type="text"
          placeholder="Найди вопрос,ответ,тег или пользователя"
        />
        <span
          onClick={() => {
            setClassHideSearch("hide_search");
          }}
        >
          Закрыть
        </span>
      </div>
      <div
        className={`${QuestionPanelCSS.nav_menu} ${QuestionPanelCSS.show_laptop}`}
      >
        <img src={NavImg} />
        <h1>Смир</h1>
        <span>Q&A</span>
      </div>

      <input
        className={`${QuestionPanelCSS.form_control} ${QuestionPanelCSS.hide_mobile}`}
        type="text"
        placeholder="Найди вопрос,ответ,тег или пользователя"
      />

      <NavLink
        to={
          userId !== null && getCookie("nickname")
            ? "./askQuestions"
            : "./SignIn"
        }
        className={`${QuestionPanelCSS.button} ${QuestionPanelCSS.hide_tablet}`}
      >
        Задать вопрос
      </NavLink>
      <div
        className={`${QuestionPanelCSS.header__toolbar} ${QuestionPanelCSS.show_tablet}`}
      >
        <img
          onClick={() => setClassHideSearch("show_search")}
          src={SearchImg}
          alt=""
          className={`${QuestionPanelCSS.searh_img} ${QuestionPanelCSS.show_mobile}`}
        />
        <NavLink
          to={
            userId !== null && getCookie("nickname")
              ? "./askQuestions"
              : "./SignIn"
          }
        >
          <img src={PlusImg} alt="" className={QuestionPanelCSS.plus_img} />
        </NavLink>
      </div>
    </div>
  );
};
export default QuestionPanel;
