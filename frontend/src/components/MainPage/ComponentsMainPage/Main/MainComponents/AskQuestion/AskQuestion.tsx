import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { schemaForAskQuestions } from "../../../../../Schemas/SchemaAskQuestions";
import AskQuestionsCSS from "./AskQuestion.module.css";
import userIdContext from "../../../../../Context/Context";

interface MyValues {
  question_title: string;
  question_tags: string;
  question_details: string;
  question_id: string | number;
}
interface Context {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
function getCookie(name: string): RegExp | string {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}
let createQuestion = async (values: any) => {
  let res = await fetch("/createQuestion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionTitle: values.question_title,
      questionTags: values.question_tags,
      questionDetails: values.question_details,
      question_id: values.question_id,
      userId: localStorage.getItem("userId"),
    }),
  });
  let data = await res.json();
  console.log(data);
  if (data.status === "SUCCESS") {
    setTimeout(() => {
      window.location.href = "http://localhost:3000/questions";
    });
  }
};
const AskQuestion = () => {
  const { userId, setUserId } = useContext<Context>(userIdContext);
  let [nameTag, setNameTag] = useState("");
  let [correctNameTag, setCorrectNameTag] = useState("");
  let [error, setError] = useState("");
  let [massivTags, setMassivTags] = useState([]);
  useEffect(() => {
    if (userId !== null && getCookie("nickname")) {
      let getInfoTags = async () => {
        let res = await fetch("/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nameTag: nameTag,
          }),
        });
        let data = await res.json();
        if (data.tags.length > 0) {
          setMassivTags(data.tags);
          setError("");
        } else {
          if (data.tags.length === 0 && nameTag !== "") {
            setError("Такого тега не существует");
            setMassivTags([]);
          } else {
            setError("");
          }
        }
      };
      getInfoTags();
    } else {
      window.location.href = `http://localhost:3000/SignIn`;
    }
  }, [nameTag]);
  const onSubmit = async (values: MyValues, actions: any) => {
    values.question_tags = nameTag;
    if (correctNameTag !== nameTag || correctNameTag === "") {
      setError("Такого тега не существует");
    } else {
      setError("");
      createQuestion(values);
    }
  };
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
      question_title: "",
      question_tags: "",
      question_details: "",
      question_id: "",
    },
    onSubmit,
    validationSchema: schemaForAskQuestions,
  });

  return (
    <div className={AskQuestionsCSS["question-container"]}>
      <h3 className={AskQuestionsCSS["question-title"]}>Новый вопрос</h3>
      <form onSubmit={handleSubmit} className={AskQuestionsCSS["input-group"]}>
        <label className={AskQuestionsCSS["form-label"]}>Суть вопроса</label>
        <span className={AskQuestionsCSS["form__text"]}>
          Сформулируйте вопрос так, чтобы сразу было понятно, о чём речь.
        </span>
        <input
          id="question_title"
          type="text"
          value={values.question_title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.question_title && touched.question_title
              ? AskQuestionsCSS["form-control-error"]
              : AskQuestionsCSS["form-control"]
          }
        />
        {errors.question_title && touched.question_title ? (
          <span className={AskQuestionsCSS["form-control-error__text"]}>
            {errors.question_title}
          </span>
        ) : (
          ""
        )}
        <label className={AskQuestionsCSS["form-label"]}>Тэги вопроса</label>
        <span className={AskQuestionsCSS["form__text"]}>
          Укажите тег — предметных областей (HTML,CSS,JavaScript,React,Vue,Git),
          к которым вопрос относится.
        </span>
        <input
          autoComplete="off"
          id="question_tags"
          type="text"
          value={nameTag}
          onChange={(e) => {
            handleChange(e);
            setNameTag(e.target.value.trim());
          }}
          onBlur={(e) => {
            handleBlur(e);
            setNameTag(e.target.value.trim());
          }}
          className={
            (errors.question_tags || error !== "") && touched.question_tags
              ? AskQuestionsCSS["form-control-error"]
              : AskQuestionsCSS["form-control"]
          }
        />
        {errors.question_tags && touched.question_tags ? (
          <span className={AskQuestionsCSS["form-control-error__text"]}>
            {errors.question_tags}
          </span>
        ) : (
          ""
        )}
        {error ? (
          <span className={AskQuestionsCSS["form-control-error__text"]}>
            {error}
          </span>
        ) : (
          ""
        )}
        <div className={AskQuestionsCSS["pop-up-container"]}>
          <ul
            className={
              nameTag !== "" &&
              massivTags.length > 0 &&
              nameTag !== correctNameTag
                ? AskQuestionsCSS["pop-up"]
                : ""
            }
          >
            {massivTags.map((item, index) => {
              if (nameTag !== "" && nameTag !== item.name_tag) {
                return (
                  <li
                    onMouseDown={(e) => {
                      setNameTag(item.name_tag);
                      setCorrectNameTag(item.name_tag);
                      values.question_id = item.id;
                    }}
                    key={index}
                    className={AskQuestionsCSS["pop-up__card"]}
                  >
                    <img
                      src={item.img_tag}
                      alt=""
                      className={AskQuestionsCSS["pop-up__image"]}
                    />
                    {item.name_tag}
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <label className={AskQuestionsCSS["form-label"]}>Детали вопроса</label>
        <span className={AskQuestionsCSS["form__text"]}>
          Опишите в подробностях свой вопрос, чтобы получить более точный ответ.
        </span>
        <textarea
          id="question_details"
          value={values.question_details}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.question_details && touched.question_details
              ? AskQuestionsCSS["form-control-error"]
              : AskQuestionsCSS["form-control"]
          }
        ></textarea>
        {errors.question_details && touched.question_details ? (
          <span className={AskQuestionsCSS["form-control-error__text"]}>
            {errors.question_details}
          </span>
        ) : (
          ""
        )}
        <button
          type="submit"
          className={AskQuestionsCSS["btn"]}
          disabled={isSubmitting}
        >
          <span className={AskQuestionsCSS["btn__text"]}>Опубликовать</span>
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
