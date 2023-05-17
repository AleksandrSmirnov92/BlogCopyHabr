import React, { useEffect, useState } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import { NavLink } from "react-router-dom";
import Question from "./Question/Question";
import currentTime from "../../../../../../helpers/currentTime";
const AllQuestions = () => {
  let [questions, setQuestions] = useState([]);
  let [valueLink, setValueLink] = useState("Новые вопросы");
  const getQuestions = async () => {
    const res = await fetch(`/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: localStorage.getItem("userId") }),
    });
    const data = await res.json();
    setQuestions(data.questions);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  // const getQuestions = async () => {
  //   const res = await fetch(`/questions`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   setQuestions(data.questions);
  // };
  // useEffect(() => {
  //   getQuestions();
  // }, []);

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
