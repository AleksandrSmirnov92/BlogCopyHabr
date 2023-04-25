import React, { useEffect, useState } from "react";
import MyFeedCSS from "./myFeed.module.css";
import Question from "../AllQuestions/Question/Question";
import { NavLink } from "react-router-dom";
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
const MyFeed: React.FC = () => {
  let [questions, setQuestions] = useState([]);
  let [navValue, setNavValue] = useState("Интересные");
  let userId = localStorage.getItem("userId");

  let currentTime = (date: Date) => {
    let formatterHour = new Intl.NumberFormat("ru", {
      style: "unit",
      unit: "hour",
      unitDisplay: "long",
    });
    let formatterMinutes = new Intl.NumberFormat("ru", {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
    });
    let currentTime = new Date();
    if (
      date.getDate() !== currentTime.getDate() ||
      date.getMonth() !== currentTime.getMonth() ||
      date.getFullYear() !== currentTime.getFullYear()
    ) {
      return `Опубликован ${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()} в  ${formatterHour.format(
        date.getHours()
      )} ${formatterMinutes.format(date.getMinutes())}`;
    }
    let currentHours = currentTime.getHours() - date.getHours();
    let currentMinutes = currentTime.getMinutes() - date.getMinutes();

    return `Опубликован ${formatterHour.format(
      currentHours
    )} ${formatterMinutes.format(currentMinutes)} назад`;
  };

  let getMyQuestions = async () => {
    const res = await fetch(`/myFeed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const data = await res.json();
    console.log(data);
    setQuestions(data.questions);
  };
  useEffect(() => {
    if (userId !== null && getCookie("nickname")) {
      getMyQuestions();
    } else {
      window.location.href = `http://localhost:3000/SignIn`;
    }
  }, []);
  return (
    <div className={MyFeedCSS["main-container"]}>
      <h3>Моя лента</h3>
      <nav className={MyFeedCSS["nav"]}>
        <NavLink
          className={
            navValue === "Интересные"
              ? `${MyFeedCSS["nav-item"]} ${MyFeedCSS["nav-item_focus"]}`
              : MyFeedCSS["nav-item"]
          }
          to={`/myFeed`}
          onClick={() => setNavValue("Интересные")}
        >
          Интересные
        </NavLink>
        <NavLink
          className={
            navValue === "Без ответа"
              ? `${MyFeedCSS["nav-item"]} ${MyFeedCSS["nav-item_focus"]}`
              : MyFeedCSS["nav-item"]
          }
          to={`/myFeed`}
          onClick={() => setNavValue("Без ответа")}
        >
          Без ответа
        </NavLink>
      </nav>
      <div className={MyFeedCSS["questions-list"]}>
        {navValue === "Без ответа"
          ? questions
              .filter((question) => question.countAnswers === 0)
              .map((question, index) => {
                return (
                  <Question
                    key={index}
                    question={question}
                    currentTime={currentTime}
                  />
                );
              })
          : questions
              .map((question, index) => {
                return (
                  <Question
                    key={index}
                    question={question}
                    currentTime={currentTime}
                  />
                );
              })
              .reverse()}
      </div>
    </div>
  );
};

export default MyFeed;
