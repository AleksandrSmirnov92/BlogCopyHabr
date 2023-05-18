import React, { useEffect, useState } from "react";
import TagCSS from "./Tag.module.css";
import { useParams, useLocation } from "react-router-dom";
import Question from "../../AllQuestions/Question/Question";
import currentTime from "../../../../../../../helpers/currentTime";
interface ResponseData {
  message: string;
  body: {
    description: string;
    img_tag: string;
    name_tag: string;
    tagsFollowers: string;
  };
}
const Tag: React.FC = () => {
  let location = useLocation();
  let question: string = location.state;
  let { tagId } = useParams();
  let [description, setDescription] = useState("");
  let [pathImg, setPathImg] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [count, setCount] = useState("");
  let [questions, setQuestions] = useState([]);
  let [linkValue, setLinkValue] = useState(question ? `Вопросы` : "Информация");
  useEffect(() => {
    if (linkValue === "Вопросы") {
      console.log("log");
      let getInformationQuestion = async () => {
        let res = await fetch(`/getQuestionsId/${tagId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let data = await res.json();
        setQuestions(data.questions);
      };
      getInformationQuestion();
    }
    const getInformationTag = async () => {
      let res = await fetch(`/tag/${tagId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data: ResponseData = await res.json();
      setCount(data.body.tagsFollowers);
      setDescription(data.body.description);
      setPathImg(data.body.img_tag);
      setNameTag(data.body.name_tag);
    };
    getInformationTag();
    window.history.replaceState({}, document.title);
  }, [linkValue, questions, tagId]);
  return (
    <div className={TagCSS["tag-container"]}>
      <header className={TagCSS["tag-header"]}>
        <div className={`${TagCSS["tag-header__image"]}`}>
          <img src={pathImg} alt="" />
        </div>
        <h1 className={`${TagCSS["tag-header__title"]}`}>{nameTag}</h1>
        <span
          className={`${TagCSS["tag-header__counter"]} ${TagCSS["tag-header__counter_size"]}`}
        >
          {count}
        </span>
        <span
          className={`${TagCSS["tag-header__subtitle"]} ${TagCSS["tag-header__subtitle_size"]}`}
        >
          Подписчиков
        </span>
      </header>
      <main>
        <nav
          className={`${TagCSS["nav"]} ${TagCSS["nav_outline"]} ${TagCSS["nav_m"]}`}
        >
          <div
            className={`${TagCSS["nav__item"]}`}
            onClick={() => setLinkValue("Информация")}
          >
            <span
              className={
                linkValue === "Информация"
                  ? `${TagCSS["nav__item_active"]} ${TagCSS["nav__item_size"]}`
                  : ""
              }
            >
              Информация
            </span>
          </div>
          <div
            className={`${TagCSS["nav__item"]}`}
            onClick={() => setLinkValue("Вопросы")}
          >
            <span
              className={
                linkValue === "Вопросы"
                  ? `${TagCSS["nav__item_active"]} ${TagCSS["nav__item_size"]}`
                  : ""
              }
            >
              Вопросы
            </span>
          </div>
        </nav>
        <div
          className={`${TagCSS["tag-content"]} ${TagCSS["tag-content_p"]} ${TagCSS["tag-content_size"]}`}
        >
          {linkValue === "Информация" ? (
            description
          ) : questions.length > 0 ? (
            questions.map((question, index) => {
              return (
                <Question
                  key={index}
                  question={question}
                  currentTime={currentTime}
                />
              );
            })
          ) : (
            <h4
              className={`${TagCSS["tag-content__title"]} ${TagCSS["tag-content__title_p"]}`}
            >
              Вопросов нет
            </h4>
          )}
        </div>
      </main>
    </div>
  );
};
export default Tag;
