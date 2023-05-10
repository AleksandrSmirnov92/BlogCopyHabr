import React, { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import QuestionPanelCSS from "./QuestionPanel.module.css";
import userIdContext from "../../../Context/Context";
import PlusImg from "../../../../images/plus.png";
import SearchImg from "../../../../images/searh.png";
import getCookie from "../../../../helpers/getCookie";

interface Props {
  toggleClass: boolean;
  setHideNavImg: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Context {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const QuestionPanel: React.FC<Props> = ({
  toggleClass,
  setHideNavImg,
}: Props) => {
  const userId = useContext<Context>(userIdContext);
  const [classHideSearch, setClassHideSearch] = useState("hide_search");
  const [inputValue, setInputValue] = useState("");
  const [collectionSearch, setCollectionSearch] = useState([]);
  const inputEl = useRef(null);
  return (
    <div
      className={
        toggleClass
          ? QuestionPanelCSS.question_panel
          : `${QuestionPanelCSS.question_panel_active} ${QuestionPanelCSS.question_panel}`
      }
    >
      <div
        className={`${QuestionPanelCSS[classHideSearch]} ${QuestionPanelCSS.hide_desktop}
        `}
      >
        <input
          className={QuestionPanelCSS.show_search__form_control}
          type="text"
          placeholder="Найди вопрос,ответ,тег или пользователя"
          value={inputValue}
          onChange={(e) => {
            fetch("/getAllInfo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                search: e.target.value,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setCollectionSearch(data.collection);
              });
            setInputValue(e.target.value);
          }}
        />

        <span
          onClick={() => {
            setClassHideSearch("hide_search");
            setHideNavImg((prevState) => !prevState);
            setInputValue("");
          }}
        >
          Закрыть
        </span>

        <div className={QuestionPanelCSS.show_search__modal}>
          <ul className={QuestionPanelCSS.show_search__menu}>
            {collectionSearch.map((item, index): any => {
              return (
                <a
                  href={`http://localhost:3000/${item.route}/${item.id}`}
                  onClick={() => {
                    setInputValue("");
                  }}
                  key={index}
                >
                  <li className={`${QuestionPanelCSS.show_search__menu__item}`}>
                    <div className={QuestionPanelCSS.search_menu__item_wrapper}>
                      <div
                        className={
                          item.img_tag
                            ? QuestionPanelCSS.form_control__search_menu__item__image
                            : ""
                        }
                      >
                        <img src={item.img_tag} alt="" />
                      </div>
                      <span>
                        {item.name_tag ||
                          item.nickname ||
                          item.question_title ||
                          item.answers}
                      </span>
                    </div>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={
          toggleClass
            ? `${QuestionPanelCSS.nav_menu} ${QuestionPanelCSS.show_laptop} ${QuestionPanelCSS.nav_menu_active}`
            : `${QuestionPanelCSS.nav_menu} ${QuestionPanelCSS.show_laptop}`
        }
      >
        <h1>Смир</h1>
        <span>Q&A</span>
      </div>
      <div
        className={`${QuestionPanelCSS.form_control__wrapper} ${QuestionPanelCSS.hide_mobile}`}
      >
        <input
          ref={inputEl}
          className={`${QuestionPanelCSS.form_control}`}
          value={inputValue}
          type="text"
          placeholder="Найди вопрос,ответ,тег или пользователя"
          onChange={(e) => {
            fetch("/getAllInfo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                search: e.target.value,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setCollectionSearch(data.collection);
              });
            setInputValue(e.target.value);
          }}
        />
        <div
          className={`${QuestionPanelCSS.form_control__search_menu_wrapper}`}
        >
          <ul className={`${QuestionPanelCSS.form_control__search_menu}`}>
            {collectionSearch.map((item, index): any => {
              return (
                <a
                  href={`http://localhost:3000/${item.route}/${item.id}`}
                  onClick={() => {
                    setInputValue("");
                  }}
                  key={index}
                >
                  <li
                    className={`${QuestionPanelCSS.form_control__search_menu__item}`}
                  >
                    <div className={QuestionPanelCSS.search_menu__item_wrapper}>
                      <div
                        className={
                          item.img_tag
                            ? QuestionPanelCSS.form_control__search_menu__item__image
                            : ""
                        }
                      >
                        <img src={item.img_tag} alt="" />
                      </div>
                      <span>
                        {item.name_tag ||
                          item.nickname ||
                          item.question_title ||
                          item.answers}
                      </span>
                    </div>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
      <NavLink
        to={
          userId !== null && getCookie("nickname")
            ? "./askQuestions"
            : "./SignIn"
        }
        className={`${QuestionPanelCSS.button} ${QuestionPanelCSS.hide_tablet}`}
      >
        Задать вопрос
      </NavLink>
      <div
        className={`${QuestionPanelCSS.header__toolbar} ${QuestionPanelCSS.show_tablet}`}
      >
        <img
          onClick={() => {
            setClassHideSearch("show_search");
            setInputValue("");
            setHideNavImg((prevState) => !prevState);
          }}
          src={SearchImg}
          alt=""
          className={`${QuestionPanelCSS.searh_img} ${QuestionPanelCSS.show_mobile}`}
        />
        <NavLink
          to={
            userId !== null && getCookie("nickname")
              ? "./askQuestions"
              : "./SignIn"
          }
        >
          <img src={PlusImg} alt="" className={QuestionPanelCSS.plus_img} />
        </NavLink>
      </div>
    </div>
  );
};
export default QuestionPanel;
