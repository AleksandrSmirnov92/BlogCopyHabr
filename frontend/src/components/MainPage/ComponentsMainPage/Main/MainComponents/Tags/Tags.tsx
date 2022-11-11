import React, { useState } from "react";
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
        {/* <div className={TagsCSS.tag}>
          <a href="#">
            <img src={JavaScriptTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            JavaScript
          </a>

          <a href="#" className={TagsCSS.countQuestion}>
            103713 вопросов
          </a>
          <button className={TagsCSS.buttonUnsubscribe}>
            Вы подписаны | 72К
          </button>
        </div>
        <div className={TagsCSS.tag}>
          <a href="#">
            <img src={HTMLTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            HTML
          </a>
          <a href="#" className={TagsCSS.countQuestion}>
            203713 вопросов
          </a>
          <button className={TagsCSS.buttonSubscribe}>Подписаться | 72К</button>
        </div>
        <div className={TagsCSS.tag}>
          <a href="#">
            <img src={CSSTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            CSS
          </a>

          <a href="#" className={TagsCSS.countQuestion}>
            103713 вопросов
          </a>
          <button className={TagsCSS.buttonSubscribe}>Подписаться | 72К</button>
        </div>
        <div className={TagsCSS.tag}>
          <a href="#">
            <img src={ReactTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            React
          </a>
          <a href="#" className={TagsCSS.countQuestion}>
            103713 вопросов
          </a>
          <button className={TagsCSS.buttonSubscribe}>Подписаться | 72К</button>
        </div>
        <div className={TagsCSS.tag}>
          <a href="#">
            <img src={VueTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            Vue
          </a>
          <a href="#" className={TagsCSS.countQuestion}>
            103713 вопросов
          </a>
          <button className={TagsCSS.buttonSubscribe}>Подписаться | 72К</button>
        </div>
        <div className={TagsCSS.tag}>
          <a href="#">
            <img src={GitTag} className={TagsCSS.tagImg} />
          </a>
          <a href="#" className={TagsCSS.textTag}>
            Git
          </a>
          <a href="#" className={TagsCSS.countQuestion}>
            103713 вопросов
          </a>
          <button className={TagsCSS.buttonSubscribe}>Подписаться | 72К</button>
        </div> */}
      </div>
    </div>
  );
};
export default Tags;
