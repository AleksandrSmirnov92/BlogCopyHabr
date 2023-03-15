import React from "react";
import NewQuestionCSS from "./Question.module.css";
import { NavLink } from "react-router-dom";
interface MyValue {
  question: any;
  currentTime: any;
  countAnswers: any;
  answers: any;
}
const Question = ({
  question,
  currentTime,
  countAnswers,
  answers,
}: MyValue) => {
  return (
    <div className={NewQuestionCSS.question_container}>
      <header className={NewQuestionCSS.header}>
        <div className={NewQuestionCSS.header_icon}>
          <img src={question.img_tag} alt="" />
        </div>
        <NavLink to={`/tag/${question.tags_id}`}>
          {question.name_tag.toUpperCase()}
        </NavLink>
      </header>
      <main className={NewQuestionCSS.content}>
        <div>
          <NavLink to={`/questionInfo/${question.questions_id}`}>
            {question.question_title}
          </NavLink>
          <br />
          <span>{currentTime(new Date(`${question.date_of_creation}`))}</span>
        </div>
        <a href={`/questionInfo/${question.questions_id}/#answers`}>
          <span>{countAnswers(question.questions_id, answers)}</span>
          <br />
          Ответов
        </a>
      </main>
    </div>
  );
};
export default Question;
