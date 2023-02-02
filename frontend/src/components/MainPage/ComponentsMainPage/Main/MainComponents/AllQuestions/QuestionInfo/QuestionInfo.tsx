import React, { useEffect, useState } from "react";
import { schemaAnswers } from "../../../../../../Schemas/SchemaAnswers";
import imageProfil from "../../../../../../../images/photoProfil.png";
import lockImg from "../../../../../../../images/замок.png";
import { useFormik } from "formik";
import QuestionInfoCSS from "./QuestionInfo.module.css";
import { NavLink, useParams } from "react-router-dom";
interface MyValues {
  answers: string;
}
const QuestionInfo = () => {
  let [pathImg, setPathImg] = useState("");
  let [pathMyImg, setPathMyImg] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [tagsId, setTagsId] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [tagImgPath, setTagImgPath] = useState("");
  let [questionTitle, setQuestionTitle] = useState("");
  let [questionDescription, setQuestionDescription] = useState("");
  let [questionTimeCreation, setQuestionTimeCreation] = useState("");
  let [questionUserId, setQuestionUserId] = useState("");
  let [answers, setAnswers] = useState([]);
  let { questionId } = useParams();
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    });
    const data = await res.json();
    console.log(data);
    setPathImg(data.userInfo.img);
    setPathMyImg(data.myImg);
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
    setAnswers(data.answers);
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
    setAnswers((prevState) => [...prevState, data.answer]);
    values.answers = "";
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
    <div className={QuestionInfoCSS.mainContainer}>
      <div className={QuestionInfoCSS.infoUser}>
        <div className={QuestionInfoCSS.infoUser__container}>
          <NavLink
            to={`/users/${localStorage.getItem("userId")}`}
            className={QuestionInfoCSS.imgLink}
          >
            <img
              src={pathImg ? pathImg : imageProfil}
              alt=""
              className={QuestionInfoCSS.imgProfil}
            />
          </NavLink>
          <NavLink
            to={`/users/${localStorage.getItem("userId")}`}
            className={QuestionInfoCSS.userName}
          >
            {name}
          </NavLink>
          <span className={QuestionInfoCSS.userEmail}>{email}</span>
        </div>
      </div>
      <div className={QuestionInfoCSS.questionInfo}>
        <NavLink to={`/tag/${tagsId}`} className={QuestionInfoCSS.imgLinkTag}>
          <img src={tagImgPath} alt="" className={QuestionInfoCSS.imgTag} />
        </NavLink>
        <NavLink to={`/tag/${tagsId}`} className={QuestionInfoCSS.nameTag}>
          {nameTag}
        </NavLink>
      </div>
      <h1 className={QuestionInfoCSS.title}>{questionTitle}</h1>
      <div className={QuestionInfoCSS.info}>
        <p className={QuestionInfoCSS.info__text}>{questionDescription}</p>
        <span className={QuestionInfoCSS.info__data}>
          {questionTimeCreation}
        </span>
      </div>
      <h2
        className={
          answers.length !== 0
            ? QuestionInfoCSS.answers__title
            : QuestionInfoCSS.hide
        }
      >
        Ответы на вопросы ({answers.length})
      </h2>
      <div
        className={
          answers.length !== 0
            ? QuestionInfoCSS.answers__container
            : QuestionInfoCSS.hide
        }
      >
        {answers.map((answer) => {
          return (
            <div>
              <div className={QuestionInfoCSS.answer}>
                <NavLink
                  to={`/users/${answer.user_id_from_users}`}
                  className={QuestionInfoCSS.answer__img_link}
                >
                  <img
                    src={answer.img}
                    className={QuestionInfoCSS.answer__img}
                  />
                </NavLink>
                <NavLink
                  to={`/users/${answer.user_id_from_users}`}
                  className={QuestionInfoCSS.answers_user_name_link}
                >
                  <h2 className={QuestionInfoCSS.answers_user_name}>
                    {`${answer.fullname} ${answer.lastname}`}
                  </h2>
                </NavLink>
                <span className={QuestionInfoCSS.answers_user_email}>
                  {answer.email}
                </span>
              </div>

              <span className={QuestionInfoCSS.answer_user_clarification}>
                Это мой ответ на твой вопрос
              </span>
              <p className={QuestionInfoCSS.answer_user_text}>
                {answer.answers}
              </p>
            </div>
          );
        })}
      </div>
      <h2 className={QuestionInfoCSS.answers__title}>Ваш ответ на вопрос</h2>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionInfoCSS.showAuthorisation
            : QuestionInfoCSS.hideAuthorisation
        }
      >
        <form
          onSubmit={handleSubmit}
          className={QuestionInfoCSS.my_answer__container}
        >
          <div className={QuestionInfoCSS.my_answer_text}>
            <NavLink
              to={`/users/${localStorage.getItem(`userId`)}`}
              className={QuestionInfoCSS.my_answer__img_link}
            >
              <img
                src={pathMyImg ? pathMyImg : imageProfil}
                className={QuestionInfoCSS.my_answer__img}
              />
            </NavLink>
            <textarea
              // className={QuestionInfoCSS.my_answer}
              name=""
              id="answers"
              className={
                errors.answers && touched.answers
                  ? QuestionInfoCSS.inputError
                  : QuestionInfoCSS.my_answer
              }
              value={values.answers}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
          </div>
          {errors.answers && touched.answers ? (
            <span className={QuestionInfoCSS.error}>{errors.answers}</span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={QuestionInfoCSS.my_answer_btn}
            disabled={isSubmitting}
          >
            <span>Опубликовать</span>
          </button>
        </form>
      </div>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionInfoCSS.hideAuthorisation
            : QuestionInfoCSS.showAuthorisation
        }
      >
        <div className={QuestionInfoCSS.my_answer__container_Authorisation}>
          <div className={QuestionInfoCSS.lock_container}>
            <img className={QuestionInfoCSS.lockImg} src={lockImg} alt="" />
          </div>
          <h3>Войдите,чтобы написать ответ</h3>
          <NavLink
            to={"/SignIn"}
            className={QuestionInfoCSS.link_to_authorisation_container}
          >
            <span className={QuestionInfoCSS.link_to_authorisation_text}>
              Войдите через центр авторицации
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default QuestionInfo;
