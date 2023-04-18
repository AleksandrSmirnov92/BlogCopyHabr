import React, { useEffect, useState } from "react";
import TagCSS from "./Tag.module.css";
import { useParams, useLocation } from "react-router-dom";
import Question from "../../AllQuestions/Question/Question";

interface ResponseData {
  message: string;
  body: {
    description: string;
    img_tag: string;
    name_tag: string;
    tags_id: string;
  };
  countFollowers: string;
  questionsTag: {}[];
  answers: [];
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
  let [answers, setAnswers] = useState([]);
  let [linkValue, setLinkValue] = useState(question ? `Вопросы` : "Информация");

  let currentTime = (date: Date) => {
    let formatterHour = new Intl.NumberFormat("ru", {
      style: "unit",
      unit: "hour",
      unitDisplay: "long",
    });
    let formatterMinutes = new Intl.NumberFormat("ru", {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
    });
    let currentTime = new Date();
    if (
      date.getDate() !== currentTime.getDate() ||
      date.getMonth() !== currentTime.getMonth() ||
      date.getFullYear() !== currentTime.getFullYear()
    ) {
      return `Опубликован ${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()} в  ${formatterHour.format(
        date.getHours()
      )} ${formatterMinutes.format(date.getMinutes())}`;
    }
    let currentHours = currentTime.getHours() - date.getHours();
    let currentMinutes = currentTime.getMinutes() - date.getMinutes();

    return `Опубликован ${formatterHour.format(
      currentHours
    )} ${formatterMinutes.format(currentMinutes)} назад`;
  };
  let countAnswers = (idQuestions: string, answers: []): number => {
    let countAnswers = answers.filter(
      (element: any) => element.question_id_from_questions === idQuestions
    ).length;

    return countAnswers;
  };
  const getInformationTag = async () => {
    let res = await fetch(`/tag/${tagId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data: ResponseData = await res.json();
    setAnswers(data.answers);
    setQuestions(data.questionsTag);
    setCount(data.countFollowers);
    setDescription(data.body.description);
    setPathImg(data.body.img_tag);
    setNameTag(data.body.name_tag);
  };
  useEffect(() => {
    getInformationTag();
    window.history.replaceState({}, document.title);
  }, []);
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
                  countAnswers={countAnswers}
                  answers={answers}
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
