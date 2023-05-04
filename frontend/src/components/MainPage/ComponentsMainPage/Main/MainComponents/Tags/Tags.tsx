import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TagsCSS from "./Tags.module.css";
interface ResponseData {
  message: string;
  tags: {}[];
}

const Tags = () => {
  const [tags, setTags] = useState([]);
  const getInfoTags = async () => {
    const res = await fetch(`/tags/${localStorage.getItem("userId")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: ResponseData = await res.json();
    setTags(data.tags);
  };
  useEffect(() => {
    getInfoTags();
  }, []);
  const subscribeFollower = async (tagsId: string) => {
    const res = await fetch(`/followers/${localStorage.getItem("userId")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagsId: tagsId }),
    });
    const data: ResponseData = await res.json();
    setTags(data.tags);
  };

  return (
    <div className={TagsCSS["tags-container"]}>
      <h3>Все теги</h3>
      <div className={TagsCSS["tags-block"]}>
        {tags.map((tag: any) => {
          return (
            <div
              key={tag.id}
              className={`${TagsCSS["tags-card"]} ${TagsCSS["tags-card_outline"]} ${TagsCSS["tags-card_p"]}`}
            >
              <NavLink to={`/tag/${tag.id}`}>
                <div className={TagsCSS["tags-card__image"]}>
                  <img src={tag.img_tag} alt="" />
                </div>
              </NavLink>
              <NavLink
                to={`/tag/${tag.id}`}
                className={`${TagsCSS["tags-card__title"]} ${TagsCSS["tags-card__title_p"]} ${TagsCSS["tags-card__title_size"]}`}
              >
                {tag.name_tag}
              </NavLink>
              <Link
                to={`/tag/${tag.id}`}
                state={{ question: "Вопросы" }}
                className={`${TagsCSS["tags-card__questions"]} ${TagsCSS["tags-card__questions_outline"]} ${TagsCSS["tags-card__questions_p"]} ${TagsCSS["tags-card__questions_size"]}`}
              >
                {`${tag.countQuestions} вопросов`}
              </Link>
              <button
                className={
                  tag.btn
                    ? tag.isChecked
                      ? TagsCSS.btn_unsubscribe
                      : TagsCSS.btn_subscribe
                    : TagsCSS.btn_none
                }
                onClick={() => {
                  subscribeFollower(tag.id);
                }}
              >
                {tag.isChecked ? "Вы подписаны" : "Подписаться"} |{" "}
                {tag.countFollowers}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Tags;
