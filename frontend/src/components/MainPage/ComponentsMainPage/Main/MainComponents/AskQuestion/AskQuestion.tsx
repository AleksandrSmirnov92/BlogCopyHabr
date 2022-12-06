import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { schemaForAskQuestions } from "../../../../../Schemas/SchemaAskQuestions";
import AskQuestionsCSS from "./AskQuestion.module.css";
import JavaScriptTag from "../../../../../../images/JavascriptTag.png";
import HTMLTag from "../../../../../../images/HTMLtag.png";
import CSSTag from "../../../../../../images/CSStag.png";
import VueTag from "../../../../../../images/Vuetag.png";
import ReactTag from "../../../../../../images/Reacttag.png";
import GitTag from "../../../../../../images/Gittag.png";
interface MyValues {
  questionHeader: string;
  questionTags: string;
  questionDetails: string;
}

let massivTags: { nameTag: string; imgTag: any }[] = [
  { nameTag: "JavaScript", imgTag: JavaScriptTag },
  { nameTag: "HTML", imgTag: HTMLTag },
  { nameTag: "CSS", imgTag: CSSTag },
  { nameTag: "React", imgTag: ReactTag },
  { nameTag: "Vue", imgTag: VueTag },
  { nameTag: "Git", imgTag: GitTag },
];

const correctName = (
  nameTag: string,
  massivTags: { nameTag: string; imgTag: string }[]
): any => {
  let include = massivTags
    .map((item) => item.nameTag.toLowerCase())
    .includes(nameTag.toLowerCase());
  let find = massivTags.find(
    (item) => item.nameTag.toLowerCase() === nameTag.toLowerCase()
  );
  if (!include) {
    return false;
  }
  return find.nameTag;
};

const AskQuestion = () => {
  let [nameTag, setNameTag] = useState("");
  let [error, setError] = useState("");
  const onSubmit = async (values: MyValues, actions: any) => {
    if (!correctName(values.questionTags, massivTags)) {
      setError("Такого тега не существует");
    } else {
      setError("");
      fetch("/createQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: values.questionHeader,
          questionTags: values.questionTags,
          questionDetails: values.questionDetails,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "SUCCESS") {
            setTimeout(() => {
              window.location.href = "http://localhost:3000/questions";
            });
            console.log(response);
          }
        });
    }
    console.log(
      values.questionHeader,
      correctName(values.questionTags, massivTags),
      values.questionDetails
    );
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
      questionHeader: "",
      questionTags: "",
      questionDetails: "",
    },
    onSubmit,
    validationSchema: schemaForAskQuestions,
  });
  return (
    <div className={AskQuestionsCSS.mainContainer}>
      <h3 className={AskQuestionsCSS.questionText}>Новый вопрос</h3>
      <div className={AskQuestionsCSS.questionContainer}>
        <form onSubmit={handleSubmit} className={AskQuestionsCSS.questionForm}>
          <label className={AskQuestionsCSS.questionLabel}>Суть вопроса</label>
          <span className={AskQuestionsCSS.questionClarification}>
            Сформулируйте вопрос так, чтобы сразу было понятно, о чём речь.
          </span>
          <input
            id="questionHeader"
            type="text"
            value={values.questionHeader}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.questionHeader && touched.questionHeader
                ? AskQuestionsCSS.inputError
                : AskQuestionsCSS.questionInput
            }
          />
          {errors.questionHeader && touched.questionHeader ? (
            <span className={AskQuestionsCSS.error}>
              {errors.questionHeader}
            </span>
          ) : (
            ""
          )}
          <label className={AskQuestionsCSS.questionLabel}>Тэги вопроса</label>
          <span className={AskQuestionsCSS.questionClarification}>
            Укажите от 1 до 5 тегов — предметных областей, к которым вопрос
            относится.
          </span>
          <input
            id="questionTags"
            type="text"
            value={nameTag}
            onChange={(e) => {
              handleChange(e);
              setNameTag(e.target.value);
            }}
            onBlur={(e) => {
              if (!correctName(nameTag, massivTags)) {
                if (nameTag === "") {
                  return setError("Обязательное поле");
                }
                return setError("Такого тега не существует");
              } else {
                setNameTag(correctName(e.target.value, massivTags));
                setError("");
                handleChange(e);
                handleBlur(e);
              }
            }}
            className={
              errors.questionTags && touched.questionTags
                ? AskQuestionsCSS.inputError
                : AskQuestionsCSS.questionInput
            }
          />
          {errors.questionTags && touched.questionTags ? (
            <span className={AskQuestionsCSS.error}>{errors.questionTags}</span>
          ) : (
            ""
          )}
          {error ? <span className={AskQuestionsCSS.error}>{error}</span> : ""}
          <div className={AskQuestionsCSS.tags}>
            <ul
              className={
                nameTag !== "" && !correctName(nameTag, massivTags)
                  ? AskQuestionsCSS.modalTagUL
                  : ""
              }
            >
              {massivTags
                .filter((item) =>
                  item.nameTag.toLowerCase().includes(nameTag.toLowerCase())
                )
                .map((item, index) => {
                  if (nameTag !== "" && nameTag !== item.nameTag) {
                    return (
                      <li
                        onClick={() => {
                          setNameTag(item.nameTag);
                          if (!correctName(item.nameTag, massivTags)) {
                            setError("Такого тега не существует");
                          } else {
                            setError("");
                          }
                        }}
                        key={index}
                        className={AskQuestionsCSS.modalTag}
                      >
                        <img src={item.imgTag} alt="" />
                        {item.nameTag}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>

          <label className={AskQuestionsCSS.questionLabel}>
            Детали вопроса
          </label>
          <span className={AskQuestionsCSS.questionClarification}>
            Опишите в подробностях свой вопрос, чтобы получить более точный
            ответ.
          </span>
          <textarea
            id="questionDetails"
            value={values.questionDetails}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.questionDetails && touched.questionDetails
                ? AskQuestionsCSS.inputError
                : AskQuestionsCSS.questionInput
            }
          ></textarea>
          {errors.questionDetails && touched.questionDetails ? (
            <span className={AskQuestionsCSS.error}>
              {errors.questionDetails}
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className={
              isSubmitting
                ? AskQuestionsCSS.postQuestionFalse
                : AskQuestionsCSS.postQuestionTrue
            }
            disabled={isSubmitting}
          >
            <span>Опубликовать</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AskQuestion;
