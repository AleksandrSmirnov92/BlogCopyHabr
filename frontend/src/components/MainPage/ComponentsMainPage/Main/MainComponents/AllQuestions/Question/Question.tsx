import React from "react";
import NewQuestionCSS from "./Question.module.css";
import { NavLink } from "react-router-dom";
interface MyValue {
  question: any;
  currentTime: any;
}
const Question = ({ question, currentTime }: MyValue) => {
  console.log(question.question_tags);
  return (
    <div className={NewQuestionCSS.question_container}>
      <header className={NewQuestionCSS.header}>
        <div className={NewQuestionCSS.header_icon}>
          <img src={question.img_tag} alt="" />
        </div>
        <NavLink to={`/tag/${question.question_tags}`}>
          {question.name_tag.toUpperCase()}
        </NavLink>
      </header>
      <main className={NewQuestionCSS.content}>
        <div>
          <NavLink to={`/questionInfo/${question.question_tags}`}>
            {question.question_title}
          </NavLink>
          <br />
          <span>{currentTime(new Date(`${question.date_of_creation}`))}</span>
        </div>
        <a href={`/questionInfo/${question.question_tags}`}>
          <span>{question.countAnswers}</span>
          <br />
          Ответов
        </a>
      </main>
    </div>
  );
};
export default Question;
