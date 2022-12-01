import React, { useEffect, useState } from "react";
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

const toCase = (nameTag: string): string => {
  let include = massivTags
    .map((item) => item.nameTag.toLowerCase())
    .includes(nameTag.toLowerCase());
  let find = massivTags.find(
    (item) => item.nameTag.toLowerCase() === nameTag.toLowerCase()
  );
  if (!include) {
    return "такого тега не существует";
  }
  return find.nameTag;
};

const AskQuestion = () => {
  let [nameTag, setNameTag] = useState("");
  let [error, setError] = useState("");
  const onSubmit = async (values: MyValues, actions: any) => {
    console.log(
      values.questionHeader,
      values.questionTags,
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
              handleBlur(e);
              if (toCase(e.target.value) !== "такого тега не существует") {
                setNameTag(toCase(e.target.value));
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
          <div className={AskQuestionsCSS.tags}>
            <ul className={nameTag !== "" ? AskQuestionsCSS.modalTagUL : ""}>
              {massivTags
                .filter((item) =>
                  item.nameTag.toLowerCase().includes(nameTag.toLowerCase())
                )
                .map((item, index) => {
                  if (nameTag !== "" && nameTag !== item.nameTag) {
                    return (
                      <li
                        onClick={() => {
                          setNameTag(toCase(item.nameTag));
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
