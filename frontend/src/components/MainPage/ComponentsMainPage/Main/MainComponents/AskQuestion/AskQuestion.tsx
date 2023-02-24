import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { schemaForAskQuestions } from "../../../../../Schemas/SchemaAskQuestions";
import AskQuestionsCSS from "./AskQuestion.module.css";

interface MyValues {
  question_title: string;
  question_tags: string;
  question_details: string;
}
const correctName = (
  nameTag: string,
  massivTags: { name_tag: string; img_Tag: string }[]
) => {
  let include = massivTags
    .map((item) => item.name_tag.toLowerCase())
    .includes(nameTag.toLowerCase());
  let find = massivTags.find(
    (item) => item.name_tag.toLowerCase() === nameTag.toLowerCase()
  );
  if (!include) {
    return "";
  }
  return find.name_tag;
};

const AskQuestion: React.FC = () => {
  let [nameTag, setNameTag] = useState("");
  let [error, setError] = useState("");
  let [massivTags, setMassivTags] = useState([]);
  useEffect(() => {
    fetch("/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setMassivTags(response.tags);
      });
  }, [setMassivTags]);
  const onSubmit = async (values: MyValues, actions: any) => {
    values.question_tags = nameTag;
    if (!correctName(values.question_tags, massivTags)) {
      setError("Такого тега не существует");
    } else {
      setError("");
      fetch("/createQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionTitle: values.question_title,
          questionTags: values.question_tags,
          questionDetails: values.question_details,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "SUCCESS") {
            setTimeout(() => {
              window.location.href = "http://localhost:3000/questions";
            });
          }
        });
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
    },
    onSubmit,
    validationSchema: schemaForAskQuestions,
  });

  return (
    <div className={AskQuestionsCSS.question_container}>
      <h3 className={AskQuestionsCSS.question_title}>Новый вопрос</h3>
      <form onSubmit={handleSubmit} className={AskQuestionsCSS.input_group}>
        <label>Суть вопроса</label>
        <span className={AskQuestionsCSS.input_group_text}>
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
              ? AskQuestionsCSS.form_control__error
              : AskQuestionsCSS.form_control
          }
        />
        {errors.question_title && touched.question_title ? (
          <span className={AskQuestionsCSS.form_control__error__message}>
            {errors.question_title}
          </span>
        ) : (
          ""
        )}
        <label>Тэги вопроса</label>
        <span className={AskQuestionsCSS.input_group_text}>
          Укажите тег — предметных областей (HTML,CSS,JavaScript,React,Vue,Git),
          к которым вопрос относится.
        </span>
        <input
          id="question_tags"
          type="text"
          value={nameTag}
          onChange={(e) => {
            handleChange(e);
            setNameTag(e.target.value);
          }}
          onBlur={(e) => {
            handleBlur(e);
            if (!correctName(nameTag.trim(), massivTags)) {
              if (nameTag.trim() === "") {
                setNameTag(e.target.value.trim());
                return setError("Это обязательное поле");
              }
              return setError("Такого тега не существует");
            } else {
              setNameTag(correctName(e.target.value.trim(), massivTags));
              setError("");
            }
          }}
          className={
            (errors.question_tags || error !== "") && touched.question_tags
              ? AskQuestionsCSS.form_control__error
              : AskQuestionsCSS.form_control
          }
        />
        {errors.question_tags && touched.question_tags ? (
          <span className={AskQuestionsCSS.form_control__error__message}>
            {errors.question_tags}
          </span>
        ) : (
          ""
        )}
        {error ? (
          <span className={AskQuestionsCSS.form_control__error__message}>
            {error}
          </span>
        ) : (
          ""
        )}
        <div className={AskQuestionsCSS.pop_up_container}>
          <ul
            className={
              nameTag !== "" &&
              (!correctName(nameTag, massivTags) ||
                correctName(nameTag, massivTags) !== nameTag) &&
              massivTags.filter((item) =>
                item.name_tag.toLowerCase().includes(nameTag.toLowerCase())
              ).length > 0
                ? AskQuestionsCSS.pop_up
                : ""
            }
          >
            {massivTags
              .filter((item) =>
                item.name_tag.toLowerCase().includes(nameTag.toLowerCase())
              )
              .map((item, index) => {
                if (nameTag !== "" && nameTag !== item.name_tag) {
                  return (
                    <li
                      onMouseDown={(e) => {
                        setNameTag(item.name_tag);
                      }}
                      key={index}
                      className={AskQuestionsCSS.pop_up_tag}
                    >
                      <img
                        src={item.img_tag}
                        alt=""
                        className={AskQuestionsCSS.pop_up_img}
                      />
                      {item.name_tag}
                    </li>
                  );
                }
              })}
          </ul>
        </div>

        <label>Детали вопроса</label>
        <span className={AskQuestionsCSS.input_group_text}>
          Опишите в подробностях свой вопрос, чтобы получить более точный ответ.
        </span>
        <textarea
          id="question_details"
          value={values.question_details}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.question_details && touched.question_details
              ? AskQuestionsCSS.form_control__error
              : AskQuestionsCSS.form_control
          }
        ></textarea>
        {errors.question_details && touched.question_details ? (
          <span className={AskQuestionsCSS.form_control__error__message}>
            {errors.question_details}
          </span>
        ) : (
          ""
        )}
        <button
          type="submit"
          className={AskQuestionsCSS.btn}
          disabled={isSubmitting}
        >
          <span>Опубликовать</span>
        </button>
      </form>
    </div>
  );
};
export default AskQuestion;
