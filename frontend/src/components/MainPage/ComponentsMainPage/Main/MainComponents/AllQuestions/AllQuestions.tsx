import React, { useEffect, useState } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import { NavLink } from "react-router-dom";
import Question from "./Question/Question";
const AllQuestions = () => {
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [newQuestions, setNewQuestions] = useState("Новые вопросы");
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
    // console.log(date.getUTCDate());
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
  let countAnswers = (idQuestions: any, answers: any): any => {
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
    // let date = new Date(`${data.questions[0].date_of_creation}`);
    // setTime(currentTime(date));
    setQuestions(data.questions);
    setAnswers(data.answers);
    console.log(data);
    // console.log(data.answers);
  };
  useEffect(() => {
    getQuestions();
    console.log("все вопросы");
  }, []);
  return (
    <div className={AllQuestionsCSS.mainContainer}>
      <h3>Все Вопросы</h3>
      <div className={AllQuestionsCSS.questionCategoriesWrapper}>
        <NavLink
          to={`/questions`}
          className={AllQuestionsCSS.questionCategories}
          onClick={() => setNewQuestions("Новые вопросы")}
        >
          Новые вопросы
        </NavLink>
        <NavLink
          to={`/questions`}
          className={AllQuestionsCSS.questionCategories}
          onClick={() => setNewQuestions("Без ответа")}
        >
          Без ответа
        </NavLink>
      </div>
      <div className={AllQuestionsCSS.questionsContainer}>
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
