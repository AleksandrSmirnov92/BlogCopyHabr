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
const QuestionInfo: React.FC = () => {
  let [pathImg, setPathImg] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pathMyImg, setPathMyImg] = useState("");
  let [userActive, setUserActive] = useState("");
  let [questionUserId, setQusestionUserId] = useState("");
  let [tagsId, setTagsId] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [tagImgPath, setTagImgPath] = useState("");
  let [questionTitle, setQuestionTitle] = useState("");
  let [questionDescription, setQuestionDescription] = useState("");
  let [questionTimeCreation, setQuestionTimeCreation] = useState("");
  let [answers, setAnswers] = useState([]);
  let [userId, setUserId] = useState("");
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
        userId: localStorage.getItem("userId")
          ? localStorage.getItem("userId")
          : "Пользователь не зарегестрирован",
      }),
    });
    const data = await res.json();
    console.log(data);
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
    //
    // setNameTag(data.questionInfo.name_tag);

    // setPathMyImg(data.userInfo.img);
    // setUserActive(data.userInfo);
    // setUserId(data.userInfo.user_id);
  };
  const onSubmit = async () => {
    const res = await fetch("/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: values.answers,
        questionId: questionId,
        questionUserId: questionUserId,
        userId: userId,
      }),
    });
    const data = await res.json();
    console.log(data);
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
    <div className={QuestionInfoCSS.main_сontainer}>
      <div className={QuestionInfoCSS.question_head}>
        <NavLink
          to={`/users/${questionUserId}`}
          className={QuestionInfoCSS.question_head_img}
        >
          <img src={pathImg ? pathImg : imageProfil} alt="" />
        </NavLink>
        <NavLink
          to={`/users/${questionUserId}`}
          className={QuestionInfoCSS.question_head_user_name}
        >
          {name}
        </NavLink>
        <span>{email}</span>
      </div>

      <div className={QuestionInfoCSS.question_tags}>
        <NavLink to={`/tag/${tagsId}`}>
          <img src={tagImgPath} alt="" />
        </NavLink>
        <NavLink to={`/tag/${tagsId}`}>
          <span>{nameTag}</span>
        </NavLink>
      </div>
      <h1 className={QuestionInfoCSS.question_title}>{questionTitle}</h1>
      <div className={QuestionInfoCSS.question_body}>
        <p>
          <span>{questionDescription}</span>
        </p>
        <span>{questionTimeCreation}</span>
      </div>
      <h2
        className={
          answers.length !== 0
            ? QuestionInfoCSS.question_answers_title
            : QuestionInfoCSS.hide
        }
      >
        Ответы на вопросы ({answers.length})
      </h2>
      <div
        className={
          answers.length !== 0
            ? QuestionInfoCSS.question_answers_block
            : QuestionInfoCSS.hide
        }
      >
        {answers.map((answer, index) => {
          return (
            <>
              <div className={QuestionInfoCSS.question_answer} key={index}>
                <NavLink
                  to={`/users/${answer.responce_userId}`}
                  className={QuestionInfoCSS.question_answer_img}
                >
                  <img src={answer.img} alt="" />
                </NavLink>
                <NavLink
                  to={`/users/${answer.responce_userId}`}
                  className={QuestionInfoCSS.question_answer_username}
                >
                  <span>{`${answer.fullname} ${answer.lastname}`}</span>
                </NavLink>
                <span>{answer.email}</span>
              </div>
              <span className={QuestionInfoCSS.question_answer_clarification}>
                Это мой ответ на твой вопрос
              </span>
              <p className={QuestionInfoCSS.question_answer_text}>
                {answer.answers}
              </p>
            </>
          );
        })}
      </div>
      <h2 className={QuestionInfoCSS.question_answers_title}>
        Ваш ответ на вопрос
      </h2>
      <div
        className={
          localStorage.getItem("userId")
            ? QuestionInfoCSS.showAuthorisation
            : QuestionInfoCSS.hideAuthorisation
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={QuestionInfoCSS.question_answer_form}>
            <NavLink
              to={`/users/${localStorage.getItem(`userId`)}`}
              className={QuestionInfoCSS.my_answer__img_link}
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
                  ? QuestionInfoCSS.form_control__error
                  : QuestionInfoCSS.form_control
              }
              value={values.answers}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
          </div>
          {errors.answers && touched.answers ? (
            <div className={QuestionInfoCSS.form_control__error__message}>
              <span>{errors.answers}</span>
            </div>
          ) : (
            ""
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
      <div
        className={
          userActive
            ? QuestionInfoCSS.hideAuthorisation
            : QuestionInfoCSS.showAuthorisation
        }
      >
        <div className={QuestionInfoCSS.authorisation}>
          <div className={QuestionInfoCSS.authorisation__img}>
            <img src={lockImg} alt="" />
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
