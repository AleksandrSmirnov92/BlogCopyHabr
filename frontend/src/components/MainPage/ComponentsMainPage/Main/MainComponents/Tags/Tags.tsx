import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TagsCSS from "./Tags.module.css";
const Tags = () => {
  const [tags, setTags] = useState([]);
  const [countFollowers, setCountFollowers] = useState({});
  // Добавить число вопросов
  const searchFollow = (tag: any): boolean => {
    let currentName = tag.name_tag.toLowerCase();
    return tag[`${currentName.toLowerCase()}`];
  };
  const searchCountFollowers = (tag: any, countFollowers: any): number => {
    let currentName = tag.name_tag;
    return countFollowers[currentName];
  };
  const subscribeFollower = async (nameTag: string) => {
    const res = await fetch(`/followers/${localStorage.getItem("userId")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameTag: nameTag }),
    });
    const data = await res.json();
    console.log(data.getSubscribe);
    setTags(data.getSubscribe);
    setCountFollowers(data.countFollowers);
  };
  const getInfoTags = async () => {
    const res = await fetch(`/tags/${localStorage.getItem("userId")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setTags(data.tags);
    setCountFollowers(data.countFollowers);
  };
  useEffect(() => {
    getInfoTags();
  }, []);
  console.log(countFollowers);
  return (
    <div className={TagsCSS.mainContainer}>
      <h3>Все теги</h3>
      <div className={TagsCSS.tagsContainer}>
        {tags.map((tag) => {
          console.log(tag.img_tag);
          return (
            <div key={tag.tags_id} className={TagsCSS.tag}>
              <NavLink to={`/tag/${tag.tags_id}`}>
                <img src={tag.img_tag} className={TagsCSS.tagImg} />
              </NavLink>
              <NavLink to={`/tag/${tag.tags_id}`} className={TagsCSS.textTag}>
                {tag.name_tag}
              </NavLink>
              <a href="#" className={TagsCSS.countQuestion}>
                {"103713"}
              </a>
              <button
                className={
                  searchFollow(tag)
                    ? TagsCSS.buttonUnsubscribe
                    : TagsCSS.buttonSubscribe
                }
                onClick={() => subscribeFollower(tag.name_tag)}
              >
                {searchFollow(tag) ? "Вы подписаны" : "Подписаться"} |{" "}
                {searchCountFollowers(tag, countFollowers)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Tags;
