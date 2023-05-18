import React from "react";
import NewQuestionCSS from "./Question.module.css";
import { Link, NavLink } from "react-router-dom";
interface MyValue {
  question: any;
  currentTime: any;
}
const Question = ({ question, currentTime }: MyValue) => {
  return (
    <div className={`${NewQuestionCSS["question-container"]}`}>
      <header className={`${NewQuestionCSS["question-header"]}`}>
        <div className={`${NewQuestionCSS["question-header__image"]}`}>
          <img src={question.img_tag} alt="" />
        </div>
        <NavLink
          to={`/tag/${question.question_tags}`}
          className={`${NewQuestionCSS["question-header__name-tag"]}`}
        >
          {question.name_tag.toUpperCase()}
        </NavLink>
      </header>
      <main className={`${NewQuestionCSS["question-content-container"]}`}>
        <div className={`${NewQuestionCSS["question-content__title-wrapper"]}`}>
          <Link
            to={`/questionInfo/${question.id}`}
            state={{ questionTagsId: question.question_tags }}
            className={`${NewQuestionCSS["question-content__title"]}`}
          >
            {question.question_title}
          </Link>
          <br />
          <span
            className={`${NewQuestionCSS["question-content__date-of-creation"]}`}
          >
            {currentTime(new Date(`${question.date_of_creation}`))}
          </span>
        </div>
        <Link
          to={`/questionInfo/${question.id}`}
          state={{ questionTagsId: question.question_tags }}
          className={`${NewQuestionCSS["question-content__answers-counter"]}`}
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
