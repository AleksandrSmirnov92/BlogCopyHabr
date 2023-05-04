import React, { useEffect, useState } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import { NavLink } from "react-router-dom";
import Question from "./Question/Question";
const AllQuestions = () => {
  let [questions, setQuestions] = useState([]);
  let [valueLink, setValueLink] = useState("Новые вопросы");
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
  let getQuestions = async () => {
    const res = await fetch(`/questions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setQuestions(data.questions);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={AllQuestionsCSS["questions-container"]}>
      <h3>Все Вопросы</h3>
      <nav className={AllQuestionsCSS["nav"]}>
        <NavLink
          className={
            valueLink === "Новые вопросы"
              ? `${AllQuestionsCSS["nav-item"]} ${AllQuestionsCSS["nav-item_focus"]}`
              : AllQuestionsCSS["nav-item"]
          }
          to={`/questions`}
          onClick={() => {
            setValueLink("Новые вопросы");
          }}
        >
          Новые вопросы
        </NavLink>
        <NavLink
          className={
            valueLink === "Без ответа"
              ? `${AllQuestionsCSS["nav-item"]} ${AllQuestionsCSS["nav-item_focus"]}`
              : AllQuestionsCSS["nav-item"]
          }
          to={`/questions`}
          onClick={() => {
            setValueLink("Без ответа");
          }}
        >
          Без ответа
        </NavLink>
      </nav>
      <div className={AllQuestionsCSS["questions-list"]}>
        {valueLink === "Без ответа"
          ? questions
              .filter((question) => question.countAnswers === 0)
              .map((question, index) => {
                return (
                  <Question
                    question={question}
                    currentTime={currentTime}
                    key={index}
                  />
                );
              })
          : questions.map((question, index) => {
              return (
                <Question
                  question={question}
                  currentTime={currentTime}
                  key={index}
                />
              );
            })}
      </div>
    </div>
  );
};
export default AllQuestions;
