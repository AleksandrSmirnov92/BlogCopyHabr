import React from "react";
import AskQuestionsCSS from "./AskQuestion.module.css";
const AskQuestion = () => {
  return (
    <div className={AskQuestionsCSS.mainContainer}>
      <h3 className={AskQuestionsCSS.questionText}>Новый вопрос</h3>
      <div className={AskQuestionsCSS.questionContainer}>
        <form className={AskQuestionsCSS.questionForm}>
          <label className={AskQuestionsCSS.questionLabel}>Суть вопроса</label>
          <span className={AskQuestionsCSS.questionClarification}>
            Сформулируйте вопрос так, чтобы сразу было понятно, о чём речь.
          </span>
          <input type="text" className={AskQuestionsCSS.questionInput} />
          <label className={AskQuestionsCSS.questionLabel}>Тэги вопроса</label>
          <span className={AskQuestionsCSS.questionClarification}>
            Укажите от 1 до 5 тегов — предметных областей, к которым вопрос
            относится.
          </span>
          <input type="text" className={AskQuestionsCSS.questionInput} />
          <label className={AskQuestionsCSS.questionLabel}>
            Детали вопроса
          </label>
          <span className={AskQuestionsCSS.questionClarification}>
            Опишите в подробностях свой вопрос, чтобы получить более точный
            ответ.
          </span>
          <textarea></textarea>
          <button className={AskQuestionsCSS.postQuestion} disabled>
            <span>Опубликовать</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AskQuestion;
