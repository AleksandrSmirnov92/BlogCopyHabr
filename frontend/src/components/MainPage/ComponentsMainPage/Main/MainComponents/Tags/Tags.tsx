import React from "react";
import TagsCSS from "./Tags.module.css";
import JavaScriptTag from "../../../../../../images/JavascriptTag.png";
import HTMLTag from "../../../../../../images/HTMLtag.png";
import CSSTag from "../../../../../../images/CSStag.png";
import VueTag from "../../../../../../images/Vuetag.png";
import ReactTag from "../../../../../../images/Reacttag.png";
import GitTag from "../../../../../../images/Gittag.png";
const Tags = () => {
  return (
    <div className={TagsCSS.mainContainer}>
      <h3>Все теги</h3>
      <div className={TagsCSS.tagsContainer}>
        <div className={TagsCSS.tag}>
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
        </div>
      </div>
    </div>
  );
};
export default Tags;
