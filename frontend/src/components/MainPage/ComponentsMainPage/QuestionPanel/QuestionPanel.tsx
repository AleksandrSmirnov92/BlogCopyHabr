import React from "react";
import QuestionPanelCSS from "./QuestionPanel.module.css";
const QuestionPanel = () => {
  return (
    <div className={QuestionPanelCSS.questionPanel}>
      <input
        className={QuestionPanelCSS.inputQuestionPanel}
        type="text"
        placeholder="Найди вопрос,ответ,тег или пользователя"
      />
      <button className={QuestionPanelCSS.buttonQuestionPanel}>
        Задать вопрос
      </button>
    </div>
  );
};
export default QuestionPanel;
