import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import QuestionPanelCSS from "./QuestionPanel.module.css";
import userIdContext from "../../../Context/Context";
const QuestionPanel = () => {
  const { userId, setUserId } = useContext(userIdContext);
  useEffect(() => {
    console.log("question panel");
    setUserId(JSON.parse(localStorage.getItem("userId")));
  });
  return (
    <div className={QuestionPanelCSS.questionPanel}>
      <input
        className={QuestionPanelCSS.inputQuestionPanel}
        type="text"
        placeholder="Найди вопрос,ответ,тег или пользователя"
      />
      <NavLink
        to={userId !== null ? "./askQuestions" : "./SignIn"}
        className={QuestionPanelCSS.buttonQuestionPanel}
      >
        Задать вопрос
      </NavLink>
    </div>
  );
};
export default QuestionPanel;
