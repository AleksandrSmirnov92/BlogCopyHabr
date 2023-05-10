import React, { useEffect, useState } from "react";
import UserCSS from "./User.module.css";
import photoProfilIMG from "../../../../../../../images/photoProfil.png";
import Question from "../../AllQuestions/Question/Question";
import { useParams, useLocation, Link } from "react-router-dom";
import currentTime from "../../../../../../../helpers/currentTime";
interface ResponseData {
  message: string;
  users: {
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
    information_about_user: string;
  };
}
interface ResponseDataQuestions {
  message: string;
  questions: {
    countAnswers: number;
    date_of_creation: string;
    img_tag: string;
    name_tag: string;
    question_tags: number;
    question_title: string;
    questions_id: number;
  }[];
}
interface ResponseDataAnswers {
  message: string;
  answers: {
    answers: string;
    email: string;
    nickname: string;
    question_tags: number;
    question_title: string;
    questions_id: number;
    user_id: number;
  }[];
}

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
  let [informationAboutUser, setInformationAboutUser] = useState("");
  let [questions, setQuestions] = useState([]);
  let [myAnswers, setMyAnswers] = useState([]);
  let [linkValue, setLinkValue] = useState(
    question ? `${question.question}` : "Информация"
  );
  useEffect(() => {
    const getSettingsInformation = async () => {
      const res = await fetch(`/getInformationAboutUser/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data: ResponseData = await res.json();
      setBrieflyAboutYourself(data.users.briefly_about_yourself);
      setContacts(data.users.contacts);
      setLinkContacts(data.users.linktocontacts);
      setCountry(data.users.country);
      setRegion(data.users.region);
      setTown(data.users.town);
      setFullName(data.users.fullname);
      setLastName(data.users.lastname);
      setPathImg(data.users.img);
      setInformationAboutUser(data.users.information_about_user);
    };
    getSettingsInformation();
  }, [userId]);
  useEffect(() => {
    if (linkValue === "Вопросы") {
      let getQuestions = async () => {
        const res = await fetch(`/questions/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data: ResponseDataQuestions = await res.json();
        setQuestions(data.questions);
      };
      getQuestions();
    }
    if (linkValue === "Ответы") {
      let getAnswers = async () => {
        const res = await fetch(`/answers/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data: ResponseDataAnswers = await res.json();
        setMyAnswers(data.answers);
      };
      getAnswers();
    }
    window.history.replaceState({}, document.title);
  }, [linkValue, userId]);
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
          onClick={() => {
            setLinkValue("Вопросы");
          }}
        >
          <span className={linkValue === "Вопросы" ? UserCSS.active : ""}>
            Вопросы
          </span>
        </div>
        <div
          className={`${UserCSS["nav__item"]}`}
          onClick={() => {
            setLinkValue("Ответы");
          }}
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
              {informationAboutUser !== "" ? "Обо мне" : ""}
            </h4>
            <span className={`${UserCSS["user-content__text"]}`}>
              {" "}
              {informationAboutUser}{" "}
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
          myAnswers.map((answer, index) => {
            return (
              <div className={`${UserCSS["answer-container"]}`} key={index}>
                <Link
                  to={`/questionInfo/${answer.id}`}
                  className={`${UserCSS["answer-title"]}`}
                  state={{ questionTagsId: answer.question_tags }}
                >
                  {answer.question_title}
                </Link>
                <div className={`${UserCSS["answer-content"]}`}>
                  <div className={`${UserCSS["answer-content__image"]}`}>
                    <img
                      src={pathImg === "" ? photoProfilIMG : pathImg}
                      alt=""
                    ></img>
                  </div>
                  <span className={`${UserCSS["answer-content__nickname"]}`}>
                    {answer.nickname}
                  </span>
                  <span className={`${UserCSS["answer-content__email"]}`}>
                    {answer.email}
                  </span>
                </div>
                <div className={`${UserCSS["answer-content__details"]}`}>
                  {answer.answers}
                </div>
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
