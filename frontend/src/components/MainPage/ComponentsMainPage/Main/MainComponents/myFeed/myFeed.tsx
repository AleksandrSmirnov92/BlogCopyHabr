import React, { useEffect, useState } from "react";
import MyFeedCSS from "./myFeed.module.css";
import Question from "../AllQuestions/Question/Question";
import { NavLink } from "react-router-dom";
import currentTime from "../../../../../../helpers/currentTime";
import getCookie from "../../../../../../helpers/getCookie";
const MyFeed = ({ checkId }: any) => {
  let [questions, setQuestions] = useState([]);
  let [navValue, setNavValue] = useState("Интересные");
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId !== null && getCookie("nickname")) {
      let getMyQuestions = async () => {
        const res = await fetch(`/myFeed`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
          }),
        });
        const data = await res.json();
        setQuestions(data.questions);
      };
      getMyQuestions();
    } else {
      window.location.href = `http://localhost:3000/SignIn`;
    }
  }, [userId]);
  return (
    <div className={MyFeedCSS["main-container"]}>
      <h3>Моя лента</h3>
      <nav className={MyFeedCSS["nav"]}>
        <NavLink
          className={
            navValue === "Интересные"
              ? `${MyFeedCSS["nav-item"]} ${MyFeedCSS["nav-item_focus"]}`
              : MyFeedCSS["nav-item"]
          }
          to={`/myFeed`}
          onClick={() => setNavValue("Интересные")}
        >
          Интересные
        </NavLink>
        <NavLink
          className={
            navValue === "Без ответа"
              ? `${MyFeedCSS["nav-item"]} ${MyFeedCSS["nav-item_focus"]}`
              : MyFeedCSS["nav-item"]
          }
          to={`/myFeed`}
          onClick={() => setNavValue("Без ответа")}
        >
          Без ответа
        </NavLink>
      </nav>
      <div className={MyFeedCSS["questions-list"]}>
        {navValue === "Без ответа"
          ? questions
              .filter((question) => question.countAnswers === 0)
              .map((question, index) => {
                return (
                  <Question
                    key={index}
                    question={question}
                    currentTime={currentTime}
                  />
                );
              })
          : questions
              .map((question, index) => {
                return (
                  <Question
                    key={index}
                    question={question}
                    currentTime={currentTime}
                  />
                );
              })
              .reverse()}
      </div>
    </div>
  );
};

export default MyFeed;
