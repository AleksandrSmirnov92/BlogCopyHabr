import React, { useEffect } from "react";
import AllQuestionsCSS from "./AllQuestionsCSS.module.css";
import JsIconIMG from "../../../../../../images/JsIcon.png";
const AllQuestions = () => {
  useEffect(() => {
    console.log("все вопросы");
  });
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
              <a href="#" className={AllQuestionsCSS.questionMainSpan}>
                Почему не работа onClick ?
              </a>
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
