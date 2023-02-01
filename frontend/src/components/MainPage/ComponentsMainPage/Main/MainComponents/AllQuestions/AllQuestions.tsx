import React, { useEffect, useState } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import JsIconIMG from "../../../../../../images/JsIcon.png";
import { NavLink } from "react-router-dom";

const AllQuestions = () => {
  let [time, setTime] = useState("");
  let [questions, setQuestions] = useState([]);
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
    console.log(date.getUTCDate());
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
    console.log(currentHours, currentMinutes);
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
    // let date = new Date(`${data.questions[0].date_of_creation}`);
    // setTime(currentTime(date));
    setQuestions(data.questions);
    console.log(data.questions);
  };
  useEffect(() => {
    getQuestions();
    console.log("все вопросы");
  }, []);
  return (
    <div className={AllQuestionsCSS.mainContainer}>
      <h3>Все Вопросы</h3>
      <div className={AllQuestionsCSS.questionCategoriesWrapper}>
        <a href="#" className={AllQuestionsCSS.questionCategories}>
          Новые вопросы
        </a>
        <a href="#" className={AllQuestionsCSS.questionCategories}>
          Интересные{" "}
        </a>
        <a href="#" className={AllQuestionsCSS.questionCategories}>
          Без ответа
        </a>
      </div>
      <div className={AllQuestionsCSS.questionsContainer}>
        {questions.map((question) => {
          return (
            <div className={AllQuestionsCSS.question}>
              <div className={AllQuestionsCSS.questionHeader}>
                <img
                  src={question.img_tag}
                  className={AllQuestionsCSS.questionTagIcon}
                  alt=""
                />
                <NavLink
                  to={`/tag/${question.tags_id}`}
                  className={AllQuestionsCSS.questionTag}
                >
                  {question.name_tag.toUpperCase()}
                </NavLink>
              </div>
              <div className={AllQuestionsCSS.questionMain}>
                <div>
                  <NavLink
                    to={`/question/${question.questions_id}`}
                    className={AllQuestionsCSS.questionMainSpan}
                  >
                    {question.question_title}
                  </NavLink>
                  <br />
                  <span className={AllQuestionsCSS.questionMainSpanTwo}>
                    {currentTime(new Date(`${question.date_of_creation}`))}
                  </span>
                </div>
                <a href="#" className={AllQuestionsCSS.countNumber}>
                  <span className={AllQuestionsCSS.counter}>{}</span>
                  <br />
                  Ответов
                </a>
              </div>
            </div>
          );
        })}
        {/* <div className={AllQuestionsCSS.question}>
          <div className={AllQuestionsCSS.questionHeader}>
            <img
              src={JsIconIMG}
              className={AllQuestionsCSS.questionTagIcon}
              alt=""
            />
            <a href="#" className={AllQuestionsCSS.questionTag}>
              JAVASCRIPT
            </a>
          </div>
          <div className={AllQuestionsCSS.questionMain}>
            <div>
              <NavLink
                to={`/question`}
                className={AllQuestionsCSS.questionMainSpan}
              >
                Почему не работа onClick ?
              </NavLink>
              <br />
              <span className={AllQuestionsCSS.questionMainSpanTwo}>
                {time}
              </span>
            </div>

            <a href="#" className={AllQuestionsCSS.countNumber}>
              <span className={AllQuestionsCSS.counter}>0</span> <br />
              Ответов
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default AllQuestions;
