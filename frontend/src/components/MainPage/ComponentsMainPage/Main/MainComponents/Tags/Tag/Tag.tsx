import React, { useEffect, useState } from "react";
import TagCSS from "./Tag.module.css";
import imgTag from "../../../../../../../images/JavascriptTag.png";
import { useParams } from "react-router-dom";
const Tag = () => {
  let { tagId } = useParams();
  let [description, setDescription] = useState("");
  let [pathImg, setPathImg] = useState("");
  let [nameTag, setNameTag] = useState("");
  let [countFollowers, setCountFollowers] = useState("");
  const searchCountFollowers = (nameTag: string, countFollowers: any): any => {
    console.log(countFollowers[`${nameTag}`]);
    setCountFollowers(countFollowers[nameTag].count);
    return countFollowers[nameTag].count;
  };
  const getInformationTag = async () => {
    let res = await fetch(`/informationTag/${tagId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();
    console.log(data.body);
    console.log(data.countFollowers);
    setDescription(data.body.description);
    setPathImg(data.body.img_tag);
    setNameTag(data.body.name_tag);
    searchCountFollowers(data.body.name_tag, data.countFollowers);
  };
  useEffect(() => {
    getInformationTag();
  }, []);
  return (
    <div className={TagCSS.mainContainer}>
      <header className={TagCSS.mainContainer__header}>
        <img src={pathImg} alt="" className={TagCSS.img_tag} />
        <h1 className={TagCSS.mainContainer__header__h1}>{nameTag}</h1>
        <span className={TagCSS.mainContainer__header__count}>
          {countFollowers}
        </span>
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
        <p className={TagCSS.main__desciption}>{description}</p>
      </main>
    </div>
  );
};
export default Tag;
