import React, { useEffect, useState } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import { NavLink } from "react-router-dom";
import Question from "./Question/Question";
const AllQuestions = () => {
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [newQuestions, setNewQuestions] = useState("Новые вопросы");
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
  let countAnswers = (idQuestions: string, answers: {}[]): any => {
    let countAnswers = answers.filter(
      (element: any) => element.question_id_from_questions === idQuestions
    ).length;

    return countAnswers;
  };
  let getQuestions = async () => {
    const res = await fetch(`/questions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setQuestions(data.questions);
    setAnswers(data.answers);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={AllQuestionsCSS.all_questions_container}>
      <h3>Все Вопросы</h3>
      <nav className={AllQuestionsCSS.nav}>
        <NavLink
          className={
            valueLink === "Новые вопросы"
              ? AllQuestionsCSS.nav_focus
              : AllQuestionsCSS.nav_link
          }
          to={`/questions`}
          onClick={() => {
            setNewQuestions("Новые вопросы");
            setValueLink("Новые вопросы");
          }}
        >
          Новые вопросы
        </NavLink>
        <NavLink
          className={
            valueLink === "Без ответа"
              ? AllQuestionsCSS.nav_focus
              : AllQuestionsCSS.nav_link
          }
          to={`/questions`}
          onClick={() => {
            setNewQuestions("Без ответа");
            setValueLink("Без ответа");
          }}
        >
          Без ответа
        </NavLink>
      </nav>
      <div className={AllQuestionsCSS.questions_list}>
        {newQuestions === "Без ответа"
          ? questions
              .filter(
                (question) => countAnswers(question.questions_id, answers) === 0
              )
              .map((question) => {
                return (
                  <Question
                    question={question}
                    currentTime={currentTime}
                    countAnswers={countAnswers}
                    answers={answers}
                  />
                );
              })
          : questions
              .map((question) => {
                return (
                  <Question
                    question={question}
                    currentTime={currentTime}
                    countAnswers={countAnswers}
                    answers={answers}
                  />
                );
              })
              .reverse()}
      </div>
    </div>
  );
};
export default AllQuestions;
