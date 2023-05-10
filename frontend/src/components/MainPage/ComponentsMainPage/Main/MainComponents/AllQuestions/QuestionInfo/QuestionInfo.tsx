import React, { useEffect, useState } from "react";
import { schemaAnswers } from "../../../../../../Schemas/SchemaAnswers";
import imageProfil from "../../../../../../../images/photoProfil.png";
import lockImg from "../../../../../../../images/замок.png";
import { useFormik } from "formik";
import QuestionInfoCSS from "./QuestionInfo.module.css";
import { NavLink, useParams } from "react-router-dom";
import currentTime from "../../../../../../../helpers/currentTime";
interface MyValues {
  answers: string;
}
const QuestionInfo: React.FC = () => {
  let { questionId } = useParams();
  let [pathImg, setPathImg] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pathMyImg, setPathMyImg] = useState("");
  let [questionUserId, setQusestionUserId] = useState("");
  let [tagsId, setTagsId] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [tagImgPath, setTagImgPath] = useState("");
  let [questionTitle, setQuestionTitle] = useState("");
  let [questionDescription, setQuestionDescription] = useState("");
  let [questionTimeCreation, setQuestionTimeCreation] = useState("");
  let [answers, setAnswers] = useState([]);
  let [userId, setUserId] = useState("");
  let [userActive, setUserActive] = useState("");

  let getQuestion = async () => {
    const res = await fetch(`/question/${questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
          ? localStorage.getItem("userId")
          : "Пользователь не зарегестрирован",
      }),
    });
    const data = await res.json();
    setQuestionTitle(data.questionInfo.question_title);
    setQuestionDescription(data.questionInfo.question_details);
    setTagImgPath(data.questionInfo.img_tag);
    setNameTag(data.questionInfo.name_tag);
    setTagsId(data.questionInfo.tags_id);
    setEmail(data.questionInfo.user_email);
    setName(
      `${
        data.questionInfo.fullname !== ""
          ? `${data.questionInfo.user_fullname} ${data.questionInfo.user_lastname}`
          : data.questionInfo.nickname
      }`
    );
    setPathImg(data.questionInfo.user_img);
    setQusestionUserId(data.questionInfo.user_id);
    setQuestionTimeCreation(
      currentTime(new Date(`${data.questionInfo.date_of_creation}`))
    );
    setAnswers(data.questionInfo.answers);
    setPathMyImg(data.questionInfo.userImg);
    setUserId(data.questionInfo.userId);
    setUserActive(data.questionInfo.userActive);
  };
  const onSubmit = async () => {
    const res = await fetch("/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: values.answers,
        questionId: questionId,
        tagsId: tagsId,
        userId: userId,
      }),
    });
    const data = await res.json();
    setAnswers((prevState) => [...prevState, data.answer]);
    values.answers = "";
  };

  useEffect(() => {
    getQuestion();
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
    <div className={`${QuestionInfoCSS["question-сontainer"]}`}>
      <div className={`${QuestionInfoCSS["question-header"]}`}>
        <NavLink
          to={`/users/${questionUserId}`}
          className={`${QuestionInfoCSS["question-header__image"]}`}
        >
          <img src={pathImg ? pathImg : imageProfil} alt="" />
        </NavLink>
        <NavLink
          to={`/users/${questionUserId}`}
          className={`${QuestionInfoCSS["question-header__user-name"]}`}
        >
          {name}
        </NavLink>
        <span className={`${QuestionInfoCSS["question-header__user-email"]}`}>
          {email}
        </span>
      </div>

      <div className={`${QuestionInfoCSS["question-tag"]}`}>
        <NavLink
          to={`/tag/${tagsId}`}
          className={`${QuestionInfoCSS["question-tag__image"]} `}
        >
          <img src={tagImgPath} alt="" />
        </NavLink>
        <NavLink
          to={`/tag/${tagsId}`}
          className={`${QuestionInfoCSS["question-tag__name-tag"]}`}
        >
          <span>{nameTag}</span>
        </NavLink>
      </div>
      <h1 className={`${QuestionInfoCSS["question-title"]}`}>
        {questionTitle}
      </h1>
      <div className={`${QuestionInfoCSS["question-body"]}`}>
        <p className={`${QuestionInfoCSS["question-body__content"]}`}>
          <span>{questionDescription}</span>
        </p>
        <span
          className={`${QuestionInfoCSS["question-body__date-of-creation"]}`}
        >
          {questionTimeCreation}
        </span>
      </div>
      <h2
        className={
          answers.length !== 0
            ? `${QuestionInfoCSS["question-answers__title"]}`
            : QuestionInfoCSS.hide
        }
      >
        Ответы на вопросы ({answers.length})
      </h2>
      <div
        className={
          answers.length !== 0
            ? `${QuestionInfoCSS["question-answers__block"]}`
            : QuestionInfoCSS.hide
        }
      >
        {answers.map((answer, index) => {
          return (
            <div key={index}>
              <div className={`${QuestionInfoCSS["question-answer"]}`}>
                <NavLink
                  to={`/users/${answer.responce_userId}`}
                  className={`${QuestionInfoCSS["question-answer__image"]}`}
                >
                  <img src={pathImg ? pathImg : imageProfil} alt="" />
                </NavLink>
                <NavLink
                  to={`/users/${answer.responce_userId}`}
                  className={`${QuestionInfoCSS["question-answer__user-name"]}`}
                >
                  <span>{`${answer.fullname} ${answer.lastname}`}</span>
                </NavLink>
                <span
                  className={`${QuestionInfoCSS["question-answer__user-email"]}`}
                >
                  {answer.email}
                </span>
              </div>
              <span className={`${QuestionInfoCSS["question-answer__title"]}`}>
                Это мой ответ на твой вопрос
              </span>
              <p className={`${QuestionInfoCSS["question-answer__text"]}`}>
                {answer.answer}
              </p>
            </div>
          );
        })}
      </div>
      <h2>Ваш ответ на вопрос</h2>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionInfoCSS.showAuthorisation
            : QuestionInfoCSS.hideAuthorisation
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`${QuestionInfoCSS["input-group"]}`}>
            <NavLink
              to={`/users/${localStorage.getItem(`userId`)}`}
              className={`${QuestionInfoCSS["input-group__image"]}`}
            >
              <img
                src={pathMyImg ? pathMyImg : imageProfil}
                className={QuestionInfoCSS.my_answer__img}
                alt=""
              />
            </NavLink>
            <textarea
              name=""
              id="answers"
              className={
                errors.answers && touched.answers
                  ? `${QuestionInfoCSS["form-control-error"]}`
                  : `${QuestionInfoCSS["form-control"]}`
              }
              value={values.answers}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
          </div>
          {errors.answers && touched.answers ? (
            <div className={`${QuestionInfoCSS["form-control-error__text"]}`}>
              <span>{errors.answers}</span>
            </div>
          ) : (
            " "
          )}
          <button
            type="submit"
            className={QuestionInfoCSS.btn}
            disabled={isSubmitting}
          >
            <span className={QuestionInfoCSS.btn__text}>Опубликовать</span>
          </button>
        </form>
      </div>
      {/* -------------------------------------------------- */}
      <div
        className={
          userActive
            ? QuestionInfoCSS.hideAuthorisation
            : QuestionInfoCSS.showAuthorisation
        }
      >
        <div className={`${QuestionInfoCSS["authorisation"]}`}>
          <div className={`${QuestionInfoCSS["authorisation__image"]}`}>
            <img src={lockImg} alt="" />
          </div>
          <h3>Войдите,чтобы написать ответ</h3>
          <NavLink
            to={"/SignIn"}
            className={`${QuestionInfoCSS["authorisation__btn"]}`}
          >
            <span className={`${QuestionInfoCSS["authorisation__btn-text"]}`}>
              Войдите через центр авторицации
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default QuestionInfo;
