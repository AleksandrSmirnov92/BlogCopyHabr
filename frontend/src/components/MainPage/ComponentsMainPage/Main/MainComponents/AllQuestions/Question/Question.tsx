import React from "react";
import NewQuestionCSS from "./Question.module.css";
import { Link, NavLink } from "react-router-dom";
interface MyValue {
  question: any;
  currentTime: any;
}
const Question = ({ question, currentTime }: MyValue) => {
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
          <Link
            to={`/questionInfo/${question.questions_id}`}
            state={{ questionTagsId: question.question_tags }}
          >
            {question.question_title}
          </Link>
          <br />
          <span>{currentTime(new Date(`${question.date_of_creation}`))}</span>
        </div>
        <Link
          to={`/questionInfo/${question.questions_id}`}
          state={{ questionTagsId: question.question_tags }}
        >
          <span>{question.countAnswers}</span>
          <br />
          Ответов
        </Link>
      </main>
    </div>
  );
};
export default Question;
