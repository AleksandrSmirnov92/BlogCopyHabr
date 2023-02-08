import React, { useEffect, useState } from "react";
import MyFeedCSS from "./myFeed.module.css";
// import JsIconIMG from "../../../../../../images/JsIcon.png";
import Question from "../AllQuestions/Question/Question";
import { NavLink } from "react-router-dom";

const MyFeed = () => {
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [nameTag, setNameTag] = useState({});
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
  let getMyQuestions = async () => {
    const res = await fetch(`/myQuestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
      }),
    });
    const data = await res.json();
    setQuestions(data.questions);
    setAnswers(data.answers);
    setNameTag(data.followers);
    console.log(data);
  };
  console.log(
    questions.filter(
      (question) =>
        nameTag[question.name_tag.toLowerCase() as keyof typeof nameTag] &&
        countAnswers(question.questions_id, answers) === 0
    )
  );
  useEffect(() => {
    getMyQuestions();
    console.log("Моя страница вопросов");
  }, []);
  return (
    <div className={MyFeedCSS.mainContainer}>
      <h3>Моя лента</h3>
      <div className={MyFeedCSS.questionCategoriesWrapper}>
        <NavLink
          to={`/myFeed`}
          onClick={() => setNewQuestions("Новые вопросы")}
          className={MyFeedCSS.questionCategories}
        >
          Интересные
        </NavLink>
        <NavLink
          to={`/myFeed`}
          onClick={() => setNewQuestions("Без ответа")}
          className={MyFeedCSS.questionCategories}
        >
          Без ответа
        </NavLink>
      </div>
      <div className={MyFeedCSS.questionsContainer}>
        {
          newQuestions === "Без ответа"
            ? questions
                .filter(
                  (question) =>
                    nameTag[
                      question.name_tag.toLowerCase() as keyof typeof nameTag
                    ] && countAnswers(question.questions_id, answers) === 0
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
                .filter(
                  (question) =>
                    nameTag[
                      question.name_tag.toLowerCase() as keyof typeof nameTag
                    ]
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
                .reverse()
          /* <div className={MyFeedCSS.question}>
          <div className={MyFeedCSS.questionHeader}>
            <img src={JsIconIMG} className={MyFeedCSS.questionTagIcon} alt="" />
            <a href="#" className={MyFeedCSS.questionTag}>
              JAVASCRIPT
            </a>
          </div>
          <div className={MyFeedCSS.questionMain}>
            <div>
              <a href="#" className={MyFeedCSS.questionMainSpan}>
                Почему не работа onClick ?
              </a>
              <br />
              <span className={MyFeedCSS.questionMainSpanTwo}>
                1 подписчик &#96424 4 минуты назад #9642 12 просмотров
              </span>
            </div>

            <a href="#" className={MyFeedCSS.countNumber}>
              <span className={MyFeedCSS.counter}>0</span> <br />
              Ответов
            </a>
          </div>
        </div> */
        }
      </div>
    </div>
  );
};

export default MyFeed;
