import React, { useEffect } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import JsIconIMG from "../../../../../../images/JsIcon.png";
import { NavLink } from "react-router-dom";
const AllQuestions = () => {
  let getQuestions = async () => {
    const res = await fetch(`/questions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.message);
    console.log(data.questions);
    let date = new Date(`${data.questions[0].date_of_creation}`);
    console.log(date.getHours());
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
        <div className={AllQuestionsCSS.question}>
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
                1 подписчик &#96424 4 минуты назад #9642 12 просмотров
              </span>
            </div>

            <a href="#" className={AllQuestionsCSS.countNumber}>
              <span className={AllQuestionsCSS.counter}>0</span> <br />
              Ответов
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllQuestions;
