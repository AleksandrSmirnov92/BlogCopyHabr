import React, { useState, useEffect } from "react";
import TagsCSS from "./Tags.module.css";
import JavaScriptTag from "../../../../../../images/JavascriptTag.png";
import HTMLTag from "../../../../../../images/HTMLtag.png";
import CSSTag from "../../../../../../images/CSStag.png";
import VueTag from "../../../../../../images/Vuetag.png";
import ReactTag from "../../../../../../images/Reacttag.png";
import GitTag from "../../../../../../images/Gittag.png";
const Tags = () => {
  const [allTags, setAllTags] = useState([
    {
      nameTag: "JavaScript",
      imgTag: JavaScriptTag,
      questionsTags: "103713",
      folow: true,
      allFolowers: "72K",
    },
    {
      nameTag: "HTML",
      imgTag: HTMLTag,
      questionsTags: "103713",
      folow: false,
      allFolowers: "72K",
    },
    {
      nameTag: "CSS",
      imgTag: CSSTag,
      questionsTags: "103713",
      folow: false,
      allFolowers: "72K",
    },
    {
      nameTag: "React",
      imgTag: ReactTag,
      questionsTags: "103713",
      folow: false,
      allFolowers: "72K",
    },
    {
      nameTag: "Vue",
      imgTag: VueTag,
      questionsTags: "103713",
      folow: false,
      allFolowers: "72K",
    },
    {
      nameTag: "Git",
      imgTag: GitTag,
      questionsTags: "103713",
      folow: false,
      allFolowers: "72K",
    },
  ]);
  const [tags, setTags] = useState([]);
  const [folowersJavascript, setfolowersJavascript] = useState(0);
  const [folowersHTML, setfolowersHTML] = useState(0);
  const [folowersCSS, setfolowersCSS] = useState(0);
  const [folowersReact, setfolowersReact] = useState(0);
  const [folowersVue, setfolowersVue] = useState(0);
  const [folowersGit, setfolowersGit] = useState(0);
  const getInfoTags = async () => {
    const res = await fetch(`/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setTags(data.tagsInfo);
    setfolowersJavascript(Number(data.countFollowers.Javascript));
    setfolowersHTML(Number(data.countFollowers.HTML));
    setfolowersCSS(Number(data.countFollowers.CSS));
    setfolowersReact(Number(data.countFollowers.React));
    setfolowersVue(Number(data.countFollowers.Vue));
    setfolowersGit(Number(data.countFollowers.Git));
    console.log(folowersJavascript);
  };
  useEffect(() => {
    getInfoTags();
  }, []);
  return (
    <div className={TagsCSS.mainContainer}>
      <h3>Все теги</h3>
      <div className={TagsCSS.tagsContainer}>
        {allTags.map((tag) => {
          return (
            <div className={TagsCSS.tag}>
              <a href="#">
                <img src={tag.imgTag} className={TagsCSS.tagImg} />
              </a>
              <a href="#" className={TagsCSS.textTag}>
                {tag.nameTag}
              </a>
              <a href="#" className={TagsCSS.countQuestion}>
                {tag.questionsTags}
              </a>
              <button
                className={
                  tag.folow
                    ? TagsCSS.buttonUnsubscribe
                    : TagsCSS.buttonSubscribe
                }
              >
                {tag.folow ? "Вы подписаны" : "Подписаться"} | {tag.allFolowers}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Tags;
