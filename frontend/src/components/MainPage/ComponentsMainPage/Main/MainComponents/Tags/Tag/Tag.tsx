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
    console.log(data);
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
    <div className={TagCSS.tag_container}>
      <header className={TagCSS.header}>
        <img src={pathImg} alt="" />
        <h1>{nameTag}</h1>
        <span className={TagCSS.tag_count}>{count}</span>
        <span className={TagCSS.tag_followers}>Подписчиков</span>
      </header>
      <main>
        <nav className={TagCSS.nav}>
          <div onClick={() => setLinkValue("Информация")}>
            <span className={linkValue === "Информация" ? TagCSS.active : ""}>
              Информация
            </span>
          </div>
          <div onClick={() => setLinkValue("Вопросы")}>
            <span className={linkValue === "Вопросы" ? TagCSS.active : ""}>
              Вопросы
            </span>
          </div>
        </nav>
        <div>
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
            <h4>Вопросов нет</h4>
          )}
        </div>
      </main>
    </div>
  );
};
export default Tag;
