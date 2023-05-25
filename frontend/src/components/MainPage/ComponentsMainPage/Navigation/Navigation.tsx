import React, { useState, useEffect } from "react";
import NavigationCSS from "./Navigation.module.css";
import signInIMG from "../../../../images/signIn.png";
import allQuestionsIMG from "../../../../images/allQuestions.png";
import ExitIMG from "../../../../images/Exit.png";
import SettingsIMG from "../../../../images/Settings.png";
import allTagsIMG from "../../../../images/allTags.png";
import usersIMG from "../../../../images/users.png";
import ProfileImg from "../../../../images/photoProfil.png";
import NavImg from "../../../../images/nav.png";
import MyFeedImg from "../../../../images/myFeed.png";
import { NavLink } from "react-router-dom";
import getCookie from "../../../../helpers/getCookie";

interface Props {
  toggleClass: boolean;
  setToggleClass: React.Dispatch<React.SetStateAction<boolean>>;
  hideNavImg: boolean;
}
interface ResponseServer {
  users: {
    briefly_about_yourself: string;
    contacts: string;
    country: string;
    fullname: string;
    img: string;
    information_about_user: string;
    lastname: string;
    linktocontacts: string;
    region: string;
    town: string;
    users: { email: string };
  };
  message: string;
}
const Navigation: React.FC<Props> = ({
  toggleClass,
  setToggleClass,
  hideNavImg,
}: Props) => {
  let [userRegistred, setUserRegistred] = useState(false);
  let [pathImg, setPathImg] = useState("");
  let [fullName, setFullName] = useState("");
  let [lastName, setLastName] = useState("");
  const exit = (): void => {
    setTimeout(() => {
      document.cookie = "nickname= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("userId");
      setUserRegistred(false);
    }, 1000);
  };
  useEffect(() => {
    const getInformationAboutUser = async () => {
      const res: Response = await fetch(
        `/getInformationAboutUser/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data: ResponseServer = await res.json();
      if (data.users) {
        setPathImg(data.users.img);
        if (data.users.fullname || data.users.lastname) {
          setFullName(data.users.fullname);
          setLastName(data.users.lastname);
          return;
        }
        setFullName(data.users.users.email);
      }
    };
    getInformationAboutUser();

    if (getCookie("nickname")) {
      setUserRegistred(true);
    } else {
      console.log("пользователь не зарегестрирова");
    }
  }, []);
  return (
    <nav
      className={
        toggleClass
          ? NavigationCSS["nav"]
          : `${NavigationCSS["nav_active"]} ${NavigationCSS["nav"]}`
      }
    >
      <button
        className={`${NavigationCSS["nav__btn"]} ${NavigationCSS.show_laptop}`}
        onClick={() => {
          setToggleClass((prevState: boolean) => !prevState);
        }}
      >
        <img
          src={NavImg}
          alt=""
          className={
            hideNavImg
              ? NavigationCSS.hide_img
              : `${NavigationCSS["nav-element__image-btn"]}`
          }
        />
      </button>
      <ul className={NavigationCSS.nav_links}>
        <div
          className={
            userRegistred
              ? NavigationCSS.profil_block
              : NavigationCSS.profil_hide
          }
        >
          <li className={`${NavigationCSS["profil"]}`}>
            <NavLink
              to={`/users/${localStorage.getItem("userId")}`}
              className={`${NavigationCSS["profil__photo"]}`}
            >
              <img src={pathImg !== "" ? pathImg : ProfileImg} alt="" />
            </NavLink>
            <NavLink
              to={`/users/${localStorage.getItem("userId")}`}
              className={`${NavigationCSS["profil__nickname"]}`}
            >
              {`${fullName} ${lastName}`}
            </NavLink>
          </li>
          <NavLink
            to="./settingsProfil"
            className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover-backgroung"]}`}
            onClick={() => {
              setToggleClass((prevState: boolean) => !prevState);
            }}
          >
            <div className={`${NavigationCSS["nav-element__image"]}`}>
              <img src={SettingsIMG} alt="" />
            </div>
            <span
              className={`${NavigationCSS["nav-element__text_color-white"]}`}
            >
              Настройки
            </span>
          </NavLink>
          <NavLink
            to="./questions"
            className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover-backgroung"]}`}
            onClick={() => {
              exit();
              setToggleClass((prevState: boolean) => !prevState);
            }}
          >
            <div className={`${NavigationCSS["nav-element__image"]}`}>
              <img src={ExitIMG} alt="" />
            </div>
            <span
              className={`${NavigationCSS["nav-element__text_color-white"]}`}
            >
              Выход
            </span>
          </NavLink>
          <NavLink
            to="./myFeed"
            className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover"]}`}
            onClick={() => setToggleClass((prevState: boolean) => !prevState)}
          >
            <div className={`${NavigationCSS["nav-element__image"]}`}>
              <img src={MyFeedImg} alt="" />
            </div>
            <span
              className={`${NavigationCSS["nav-element__text_color-grey"]}`}
            >
              Моя лента
            </span>
          </NavLink>
        </div>

        {/* ------------------------------------------------------------------------------ */}
        <div
          className={
            userRegistred
              ? NavigationCSS.profil_hide
              : NavigationCSS.profil_block
          }
        >
          <NavLink
            to="/SignIn"
            className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_pd"]}`}
          >
            <div className={`${NavigationCSS["nav-element__image"]}`}>
              <img src={signInIMG} alt="" />
            </div>
            <span
              className={`${NavigationCSS["nav-element__text_color-grey"]}`}
            >
              Войти на сайт
            </span>
          </NavLink>
        </div>
        <NavLink
          to="/questions"
          className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover"]}`}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <div className={`${NavigationCSS["nav-element__image"]}`}>
            <img src={allQuestionsIMG} alt="" />
          </div>
          <span className={`${NavigationCSS["nav-element__text_color-grey"]}`}>
            Все вопросы
          </span>
        </NavLink>
        <NavLink
          to="./tags"
          className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover"]}`}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <div className={`${NavigationCSS["nav-element__image"]}`}>
            {" "}
            <img src={allTagsIMG} alt="" />
          </div>
          <span className={`${NavigationCSS["nav-element__text_color-grey"]}`}>
            Все теги
          </span>
        </NavLink>
        <NavLink
          to="./users"
          className={`${NavigationCSS["nav-element"]} ${NavigationCSS["nav-element_hover"]}`}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <div className={`${NavigationCSS["nav-element__image"]}`}>
            <img src={usersIMG} alt="" />
          </div>
          <span className={`${NavigationCSS["nav-element__text_color-grey"]}`}>
            Пользователи
          </span>
        </NavLink>
      </ul>
    </nav>
  );
};
export default Navigation;
