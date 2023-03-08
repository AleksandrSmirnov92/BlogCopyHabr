import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TagsCSS from "./Tags.module.css";
interface ResponseData {
  message: string;
  tags: {
    count?: string;
    css: boolean;
    followers_id: string;
    followers_id_from_users: string;
    git: boolean;
    html: boolean;
    img_tag: string;
    javascript: boolean;
    name_tag: string;
    react: boolean;
    tags_id: string;
    vue: boolean;
  }[];
  countFollowers: {
    CSS: string;
    Git: string;
    HTML: string;
    JavaScript: string;
    React: string;
    Vue: string;
  };
}
interface Tag {
  count?: string;
  css: boolean;
  followers_id: string;
  followers_id_from_users: string;
  git: boolean;
  html: boolean;
  img_tag: string;
  javascript: boolean;
  name_tag: string;
  react: boolean;
  tags_id: string;
  vue: boolean;
}
interface CountFollowers {
  CSS: string;
  Git: string;
  HTML: string;
  JavaScript: string;
  React: string;
  Vue: string;
}

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [countFollowers, setCountFollowers] = useState<CountFollowers | {}>({});
  const getInfoTags = async () => {
    const res = await fetch(`/tags/${localStorage.getItem("userId")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: ResponseData = await res.json();
    setTags(data.tags);
    setCountFollowers(data.countFollowers);
  };
  useEffect(() => {
    getInfoTags();
  });
  const searchFollow = (tag: Tag): boolean => {
    let currentName = tag.name_tag.toLowerCase();
    return tag[`${currentName.toLowerCase()}` as keyof typeof countFollowers];
  };

  const searchCountFollowers = (
    tag: Tag,
    countFollowers: CountFollowers | {}
  ): number => {
    let currentName = tag.name_tag;
    return countFollowers[currentName as keyof typeof countFollowers];
  };
  const subscribeFollower = async (nameTag: string) => {
    const res = await fetch(`/followers/${localStorage.getItem("userId")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameTag: nameTag }),
    });
    const data: ResponseData = await res.json();
    setCountFollowers(data.countFollowers);
  };

  return (
    <div className={TagsCSS.tags_container}>
      <h3>Все теги</h3>
      <div className={TagsCSS.block}>
        {tags.map((tag: Tag) => {
          return (
            <div key={tag.tags_id} className={TagsCSS.item}>
              <NavLink to={`/tag/${tag.tags_id}`}>
                <div className={TagsCSS.item_img}>
                  <img src={tag.img_tag} alt="" />
                </div>
              </NavLink>
              <NavLink
                to={`/tag/${tag.tags_id}`}
                className={TagsCSS.item_title}
              >
                {tag.name_tag}
              </NavLink>
              <Link
                to={`/tag/${tag.tags_id}`}
                state={{ question: "Вопросы" }}
                className={TagsCSS.count}
              >
                {`${tag.count} вопросов`}
              </Link>
              <button
                className={
                  tag.followers_id_from_users
                    ? searchFollow(tag)
                      ? TagsCSS.btn_unsubscribe
                      : TagsCSS.btn_subscribe
                    : TagsCSS.btn_none
                }
                onClick={() => {
                  subscribeFollower(tag.name_tag);
                }}
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
