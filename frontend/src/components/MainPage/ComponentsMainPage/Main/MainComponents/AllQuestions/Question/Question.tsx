import React, { useEffect, useState } from "react";
import { schemaAnswers } from "../../../../../../Schemas/SchemaAnswers";
import imageProfil from "../../../../../../../images/photoProfil.png";
import lockImg from "../../../../../../../images/замок.png";
import { useFormik } from "formik";
import QuestionCSS from "./Question.module.css";
import { NavLink, useParams } from "react-router-dom";
interface MyValues {
  answers: string;
}
const Question = () => {
  let [pathImg, setPathImg] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [tagsId, setTagsId] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [tagImgPath, setTagImgPath] = useState("");
  let [questionTitle, setQuestionTitle] = useState("");
  let [questionDescription, setQuestionDescription] = useState("");
  let [questionTimeCreation, setQuestionTimeCreation] = useState("");
  let [questionUserId, setQuestionUserId] = useState("");
  let { questionId } = useParams();
  let [answers, setAnswers] = useState("");

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
  let getQuestion = async () => {
    const res = await fetch(`/question/${questionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setPathImg(data.userInfo.img);
    setName(
      `${
        data.userInfo.fullname !== ""
          ? `${data.userInfo.fullname} ${data.userInfo.lastname}`
          : data.userInfo.nickname
      }`
    );
    setQuestionUserId(data.question.user_id);
    setEmail(data.userInfo.email);
    setTagsId(data.tagsInfo.tags_id);
    setNameTag(data.tagsInfo.name_tag);
    setTagImgPath(data.tagsInfo.img_tag);
    setQuestionTitle(data.question.question_title);
    setQuestionDescription(data.question.question_details);
    setQuestionTimeCreation(
      currentTime(new Date(`${data.question.date_of_creation}`))
    );
  };
  const onSubmit = async () => {
    const res = await fetch("/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: values.answers,
        questionId: questionId,
        questionUserId: questionUserId,
        userId: localStorage.getItem("userId"),
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getQuestion();
    console.log("Страница вопроса");
  }, []);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<MyValues>({
    initialValues: {
      answers: "",
    },
    onSubmit,
    validationSchema: schemaAnswers,
  });

  return (
    <div className={QuestionCSS.mainContainer}>
      <div className={QuestionCSS.infoUser}>
        <div className={QuestionCSS.infoUser__container}>
          <NavLink
            to={`/users/${localStorage.getItem("userId")}`}
            className={QuestionCSS.imgLink}
          >
            <img
              src={pathImg ? pathImg : imageProfil}
              alt=""
              className={QuestionCSS.imgProfil}
            />
          </NavLink>
          <NavLink
            to={`/users/${localStorage.getItem("userId")}`}
            className={QuestionCSS.userName}
          >
            {name}
          </NavLink>
          <span className={QuestionCSS.userEmail}>{email}</span>
        </div>
      </div>
      <div className={QuestionCSS.questionInfo}>
        <NavLink to={`/tag/${tagsId}`} className={QuestionCSS.imgLinkTag}>
          <img src={tagImgPath} alt="" className={QuestionCSS.imgTag} />
        </NavLink>
        <NavLink to={`/tag/${tagsId}`} className={QuestionCSS.nameTag}>
          {nameTag}
        </NavLink>
      </div>
      <h1 className={QuestionCSS.title}>{questionTitle}</h1>
      <div className={QuestionCSS.info}>
        <p className={QuestionCSS.info__text}>{questionDescription}</p>
        <span className={QuestionCSS.info__data}>{questionTimeCreation}</span>
      </div>
      <h2 className={QuestionCSS.answers__title}>Ответы на вопросы (3)</h2>
      <div className={QuestionCSS.answers__container}>
        <div className={QuestionCSS.answer}>
          <a href="#" className={QuestionCSS.answer__img_link}>
            <img src={imageProfil} className={QuestionCSS.answer__img} />
          </a>
          <a href="#" className={QuestionCSS.answers_user_name_link}>
            <h2 className={QuestionCSS.answers_user_name}>Николай Соболев</h2>
          </a>

          <span className={QuestionCSS.answers_user_email}>ryan00@mail.ru</span>
        </div>
        <span className={QuestionCSS.answer_user_clarification}>
          Это мой ответ на твой вопрос
        </span>
        <p className={QuestionCSS.answer_user_text}>
          Если на сайте установлены трекеры, а пользователь их не отключил через
          блокировщик, то узнать можно очень и очень много. Практически всё. А
          если пользователь разрешил дать геолокацию, доступ к камере и
          микрофону, то за ним можно наблюдать в реальном времени. Какую задачу
          решаешь?
        </p>
      </div>
      <h2 className={QuestionCSS.answers__title}>Ваш ответ на вопрос</h2>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionCSS.showAuthorisation
            : QuestionCSS.hideAuthorisation
        }
      >
        <form
          onSubmit={handleSubmit}
          className={QuestionCSS.my_answer__container}
        >
          <div className={QuestionCSS.my_answer_text}>
            <a href="#" className={QuestionCSS.my_answer__img_link}>
              <img src={imageProfil} className={QuestionCSS.my_answer__img} />
            </a>
            <textarea
              // className={QuestionCSS.my_answer}
              name=""
              id="answers"
              className={
                errors.answers && touched.answers
                  ? QuestionCSS.inputError
                  : QuestionCSS.my_answer
              }
              value={values.answers}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
          </div>
          {errors.answers && touched.answers ? (
            <span className={QuestionCSS.error}>{errors.answers}</span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={QuestionCSS.my_answer_btn}
            disabled={isSubmitting}
          >
            <span>Опубликовать</span>
          </button>
        </form>
      </div>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionCSS.hideAuthorisation
            : QuestionCSS.showAuthorisation
        }
      >
        <div className={QuestionCSS.my_answer__container_Authorisation}>
          <div className={QuestionCSS.lock_container}>
            <img className={QuestionCSS.lockImg} src={lockImg} alt="" />
          </div>
          <h3>Войдите,чтобы написать ответ</h3>
          <NavLink
            to={"/SignIn"}
            className={QuestionCSS.link_to_authorisation_container}
          >
            <span className={QuestionCSS.link_to_authorisation_text}>
              Войдите через центр авторицации
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Question;
