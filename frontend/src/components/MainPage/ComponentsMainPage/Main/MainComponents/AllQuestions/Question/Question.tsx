import React from "react";
import imageProfil from "../../../../../../../images/photoProfil.png";
import JavaScriptIcon from "../../../../../../../images/JsIcon.png";
import QuestionCSS from "./Question.module.css";
import { link } from "fs";
const Question = () => {
  return (
    <div className={QuestionCSS.mainContainer}>
      <div className={QuestionCSS.infoUser}>
        <div className={QuestionCSS.infoUser__container}>
          <a href="#" className={QuestionCSS.imgLink}>
            <img src={imageProfil} alt="" className={QuestionCSS.imgProfil} />
          </a>
          <a href="#" className={QuestionCSS.userName}>
            UserName
          </a>
          <span className={QuestionCSS.userEmail}>ryan00@mail.ru</span>
        </div>
      </div>
      <div className={QuestionCSS.questionInfo}>
        <a href="#" className={QuestionCSS.imgLinkTag}>
          <img src={JavaScriptIcon} alt="" className={QuestionCSS.imgTag} />
        </a>
        <a href="#" className={QuestionCSS.nameTag}>
          JavaScript
        </a>
      </div>
      <h1 className={QuestionCSS.title}>Заголовок вопроса?</h1>
      <div className={QuestionCSS.info}>
        <p className={QuestionCSS.info__text}>
          Какую информацию можно узнать о пользователе, который зашел на сайт,
          кроме userAgent?
        </p>
        <span className={QuestionCSS.info__data}>Опубликован 2 часа назад</span>
      </div>
      <h2 className={QuestionCSS.answers__title}>Ответы на вопросы (3)</h2>
      <div className={QuestionCSS.answers__container}>
        <div className={QuestionCSS.answer}>
          <a href="#" className={QuestionCSS.answer__img_link}>
            <img src={imageProfil} className={QuestionCSS.answer__img} />
          </a>
          <a href="#" className={QuestionCSS.answers_user_name_link}>
            <h2 className={QuestionCSS.answers_user_name}>Николай Соболев</h2>
          </a>

          <span className={QuestionCSS.answers_user_email}>ryan00@mail.ru</span>
        </div>
        <span className={QuestionCSS.answer_user_clarification}>
          Это мой ответ на твой вопрос
        </span>
        <p className={QuestionCSS.answer_user_text}>
          Если на сайте установлены трекеры, а пользователь их не отключил через
          блокировщик, то узнать можно очень и очень много. Практически всё. А
          если пользователь разрешил дать геолокацию, доступ к камере и
          микрофону, то за ним можно наблюдать в реальном времени. Какую задачу
          решаешь?
        </p>
      </div>
      <h2 className={QuestionCSS.answers__title}>Ваш ответ на вопрос</h2>
      <form className={QuestionCSS.my_answer__container}>
        <div className={QuestionCSS.my_answer_text}>
          <a href="#" className={QuestionCSS.my_answer__img_link}>
            <img src={imageProfil} className={QuestionCSS.my_answer__img} />
          </a>
          <textarea className={QuestionCSS.my_answer} name="" id=""></textarea>
        </div>
        <button className={QuestionCSS.my_answer_btn}>
          <span>Опубликовать</span>
        </button>
      </form>
    </div>
  );
};
export default Question;
