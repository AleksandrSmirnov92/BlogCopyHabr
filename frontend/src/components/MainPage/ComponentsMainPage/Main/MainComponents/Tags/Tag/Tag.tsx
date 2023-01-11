import React from "react";
import TagCSS from "./Tag.module.css";
import imgTag from "../../../../../../../images/JavascriptTag.png";
const Tag = () => {
  return (
    <div className={TagCSS.mainContainer}>
      <header className={TagCSS.mainContainer__header}>
        <img src={imgTag} alt="" className={TagCSS.img_tag} />
        <h1 className={TagCSS.mainContainer__header__h1}>JavaScript</h1>
        <span className={TagCSS.mainContainer__header__count}>73248</span>
        <span className={TagCSS.mainContainer__header__followers}>
          Подписчиков
        </span>
      </header>
      <main>
        <nav className={TagCSS.main__navigation_panel}>
          <a href="#" className={TagCSS.main__links}>
            <span>Информация</span>
          </a>
          <a href="#" className={TagCSS.main__links}>
            <span>Ответы</span>
          </a>
        </nav>
      </main>
    </div>
  );
};
export default Tag;
