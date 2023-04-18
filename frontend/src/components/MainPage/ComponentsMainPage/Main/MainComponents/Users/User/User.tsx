import React, { useEffect, useState } from "react";
import UserCSS from "./User.module.css";
import photoProfilIMG from "../../../../../../../images/photoProfil.png";
import Question from "../../AllQuestions/Question/Question";
import { useParams, useLocation } from "react-router-dom";
interface ResponseData {
  message: string;
  body: {
    user_id: string;
    img: string;
    fullname: string;
    lastname: string;
    briefly_about_yourself: string;
    contacts: string;
    linktocontacts: string;
    country: string;
    region: string;
    town: string;
    informattion_about_user: string;
  };
  questions: {}[];
  answers: [];
  myAnswers: [];
}
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
const getSettingsInformation = async (
  userId: string,
  setPathImg: React.Dispatch<React.SetStateAction<string>>,
  setFullName: React.Dispatch<React.SetStateAction<string>>,
  setLastName: React.Dispatch<React.SetStateAction<string>>,
  setBrieflyAboutYourself: React.Dispatch<React.SetStateAction<string>>,
  setInformattionAboutUser: React.Dispatch<React.SetStateAction<string>>,
  setContacts: React.Dispatch<React.SetStateAction<string>>,
  setLinkContacts: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setRegion: React.Dispatch<React.SetStateAction<string>>,
  setTown: React.Dispatch<React.SetStateAction<string>>,
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>,
  setAnswers: React.Dispatch<React.SetStateAction<any[]>>,
  setMyAnswers: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const res = await fetch(`/getInformationAboutUser/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data: ResponseData = await res.json();
  let {
    img,
    fullname,
    lastname,
    briefly_about_yourself,
    contacts,
    linktocontacts,
    country,
    region,
    town,
    informattion_about_user,
  } = data.body;
  setPathImg(img);
  setFullName(fullname);
  setLastName(lastname);
  setBrieflyAboutYourself(briefly_about_yourself);
  setInformattionAboutUser(informattion_about_user);
  setContacts(contacts);
  setLinkContacts(linktocontacts);
  setCountry(country);
  setRegion(region);
  setTown(town);
  setQuestions(data.questions);
  setAnswers(data.answers);
  setMyAnswers(data.myAnswers);
};
const User: React.FC = () => {
  let { userId } = useParams();
  let location = useLocation();
  let question: { question: string } = location.state;
  let [fullName, setFullName] = useState("");
  let [lastName, setLastName] = useState("");
  let [brieflyAboutYourself, setBrieflyAboutYourself] = useState("");
  let [pathImg, setPathImg] = useState("");
  let [contacts, setContacts] = useState("");
  let [linkToContacts, setLinkContacts] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");
  let [town, setTown] = useState("");
  let [informattionAboutUser, setInformattionAboutUser] = useState("");
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [myAnswers, setMyAnswers] = useState([]);
  let [linkValue, setLinkValue] = useState(
    question ? `${question.question}` : "Информация"
  );
  useEffect(() => {
    getSettingsInformation(
      userId,
      setPathImg,
      setFullName,
      setLastName,
      setBrieflyAboutYourself,
      setInformattionAboutUser,
      setContacts,
      setLinkContacts,
      setCountry,
      setRegion,
      setTown,
      setQuestions,
      setAnswers,
      setMyAnswers
    );
    window.history.replaceState({}, document.title);
  }, []);
  return (
    <div className={`${UserCSS["user-container"]}`}>
      <header className={`${UserCSS["user-header"]}`}>
        <a
          href={`http://localhost:3000/users/${localStorage.getItem("userId")}`}
          className={`${UserCSS["user-header__image"]}`}
        >
          <img src={pathImg === "" ? photoProfilIMG : pathImg} alt="" />
        </a>
        <span
          className={`${UserCSS["user-header__title"]} ${UserCSS["user-header__title_size"]}`}
        >
          {fullName} {lastName}
        </span>
        <span
          className={`${UserCSS["user-header__subtitle"]} ${UserCSS["user-header__subtitle_size"]}`}
        >
          {" "}
          {brieflyAboutYourself}
        </span>
      </header>
      <nav className={`${UserCSS["nav"]} ${UserCSS["nav_outline"]}`}>
        <div
          className={`${UserCSS["nav__item"]}`}
          onClick={() => setLinkValue("Информация")}
        >
          <span className={linkValue === "Информация" ? UserCSS.active : ""}>
            Информация
          </span>
        </div>
        <div
          className={`${UserCSS["nav__item"]}`}
          onClick={() => setLinkValue("Вопросы")}
        >
          <span className={linkValue === "Вопросы" ? UserCSS.active : ""}>
            Вопросы
          </span>
        </div>
        <div
          className={`${UserCSS["nav__item"]}`}
          onClick={() => setLinkValue("Ответы")}
        >
          <span className={linkValue === "Ответы" ? UserCSS.active : ""}>
            Ответы
          </span>
        </div>
      </nav>

      <div className={`${UserCSS["user-content"]}`}>
        {linkValue === "Информация" ? (
          <>
            <h4
              className={`${UserCSS["user-content__title"]} ${UserCSS["user-content__title_p"]}`}
            >
              {informattionAboutUser !== "" ? "Обо мне" : ""}
            </h4>
            <span className={`${UserCSS["user-content__text"]}`}>
              {" "}
              {informattionAboutUser}{" "}
            </span>

            <h4
              className={`${UserCSS["user-content__title"]} ${UserCSS["user-content__title_p"]}`}
            >
              {contacts !== "Контакты" ? "Контакты" : ""}
            </h4>
            <span className={`${UserCSS["user-content__text"]}`}>
              {contacts !== "Контакты" ? `${contacts} :` : ""}
              <a
                className={`${UserCSS["user-content__link-to-contacts"]}`}
                href={linkToContacts}
              >
                {linkToContacts}
              </a>
            </span>

            <h4
              className={`${UserCSS["user-content__title"]} ${UserCSS["user-content__title_p"]}`}
            >
              {country !== "Страна" ? "Местоположение" : ""}
            </h4>
            <span className={`${UserCSS["user-content__text"]}`}>
              {country !== "Страна" ? `${country},${region},${town}` : ""}
            </span>
          </>
        ) : linkValue === "Вопросы" ? (
          questions.length > 0 ? (
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
              className={`${UserCSS["user-content__title"]} ${UserCSS["user-content__title_p"]}`}
            >
              Вопросов нет
            </h4>
          )
        ) : myAnswers.length > 0 ? (
          myAnswers.map((answer) => {
            return (
              <div className={UserCSS.question_container}>
                <a href="#" className={UserCSS.question}>
                  {answer.question_title}
                </a>
                <div className={UserCSS.answer_avatar}>
                  <div>
                    <img src={pathImg === "" ? photoProfilIMG : pathImg}></img>
                  </div>
                  <a href="#">{answer.nickname}</a>
                  <span>{answer.email}</span>
                </div>
                <div className={UserCSS.answer_details}>{answer.answers}</div>
              </div>
            );
          })
        ) : (
          <h4
            className={`${UserCSS["user-content__title"]} ${UserCSS["user-content__title_p"]}`}
          >
            Ответов нет
          </h4>
        )}
      </div>
    </div>
  );
};
export default User;
