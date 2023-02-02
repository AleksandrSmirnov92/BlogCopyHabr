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
    <div className={NewQuestionCSS.question}>
      <div className={NewQuestionCSS.questionHeader}>
        <img
          src={question.img_tag}
          className={NewQuestionCSS.questionTagIcon}
          alt=""
        />
        <NavLink
          to={`/tag/${question.tags_id}`}
          className={NewQuestionCSS.questionTag}
        >
          {question.name_tag.toUpperCase()}
        </NavLink>
      </div>
      <div className={NewQuestionCSS.questionMain}>
        <div>
          <NavLink
            to={`/questionInfo/${question.questions_id}`}
            className={NewQuestionCSS.questionMainSpan}
          >
            {question.question_title}
          </NavLink>
          <br />
          <span className={NewQuestionCSS.questionMainSpanTwo}>
            {currentTime(new Date(`${question.date_of_creation}`))}
          </span>
        </div>
        <a
          href={`/questionInfo/${question.questions_id}/#answers`}
          className={NewQuestionCSS.countNumber}
        >
          <span className={NewQuestionCSS.counter}>
            {countAnswers(question.questions_id, answers)}
          </span>
          <br />
          Ответов
        </a>
      </div>
    </div>
  );
};
export default Question;
