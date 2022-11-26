import React from "react";
import MyFeedCSS from "./myFeed.module.css";
import JsIconIMG from "../../../../../../images/JsIcon.png";
const MyFeed = () => {
  return (
    <div className={MyFeedCSS.mainContainer}>
      <h3>Моя лента</h3>
      <div className={MyFeedCSS.questionCategoriesWrapper}>
        <a href="#" className={MyFeedCSS.questionCategories}>
          Новые вопросы
        </a>
        <a href="#" className={MyFeedCSS.questionCategories}>
          Интересные{" "}
        </a>
        <a href="#" className={MyFeedCSS.questionCategories}>
          Без ответа
        </a>
      </div>
      <div className={MyFeedCSS.questionsContainer}>
        <div className={MyFeedCSS.question}>
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
        </div>
      </div>
    </div>
  );
};
export default MyFeed;
