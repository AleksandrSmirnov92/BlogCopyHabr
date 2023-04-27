import React, { useState, useEffect, useContext } from "react";
import NavigationCSS from "./Navigation.module.css";
import signInIMG from "../../../../images/signIn.png";
import allQuestionsIMG from "../../../../images/allQuestions.png";
// import userIdContext from "../../../Context/Context";
import ExitIMG from "../../../../images/Exit.png";
import SettingsIMG from "../../../../images/Settings.png";
import allTagsIMG from "../../../../images/allTags.png";
import usersIMG from "../../../../images/users.png";
import ProfileImg from "../../../../images/photoProfil.png";
import NavImg from "../../../../images/nav.png";
import { NavLink } from "react-router-dom";

function getCookie(name: string): string {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}
interface Props {
  toggleClass: boolean;
  setToggleClass: React.Dispatch<React.SetStateAction<boolean>>;
  hideNavImg: boolean;
}
// interface Context {
//   userId: string;
//   setUserId: React.Dispatch<React.SetStateAction<string>>;
// }
const Navigation: React.FC<Props> = ({
  toggleClass,
  setToggleClass,
  hideNavImg,
}: Props) => {
  let [userRegistred, setUserRegistred] = useState(false);
  // const { userId, setUserId } = useContext<Context>(userIdContext);
  let [pathImg, setPathImg] = useState("");
  let [fullName, setFullName] = useState("");
  let [lastName, setLastName] = useState("");
  const exit = () => {
    setTimeout(() => {
      document.cookie = "nickname= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("userId");
      setUserRegistred(false);
    }, 1000);
  };
  useEffect(() => {
    const getInformationAboutUser = async () => {
      const res = await fetch(
        `/getInformationAboutUser/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setPathImg(data.users.img);
      if (data.users.fullname !== "" || data.users.lastname !== "") {
        setFullName(data.users.fullname);
        setLastName(data.users.lastname);
        return;
      }
      setFullName(data.body.email);
    };
    getInformationAboutUser();

    if (getCookie("nickname") !== "") {
      setUserRegistred(true);
    } else {
      console.log("пользователь не зарегестрирован");
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
      <div
        className={`${NavigationCSS["nav__btn"]} ${NavigationCSS.show_laptop}`}
        onClick={() => {
          setToggleClass((prevState: boolean) => !prevState);
        }}
      >
        <img
          src={NavImg}
          alt=""
          className={
            hideNavImg ? NavigationCSS.hide_img : NavigationCSS.nav_img
          }
        />
      </div>
      <ul className={NavigationCSS.nav_links}>
        <div
          className={
            userRegistred
              ? NavigationCSS.profil_block
              : NavigationCSS.profil_hide
          }
        >
          <li className={NavigationCSS.profil}>
            <a
              href={`http://localhost:3000/users/${localStorage.getItem(
                "userId"
              )}`}
              className={NavigationCSS.profil_photo}
            >
              <img src={pathImg !== "" ? pathImg : ProfileImg} alt="" />
            </a>
            <a
              href={`http://localhost:3000/users/${localStorage.getItem(
                "userId"
              )}`}
              className={NavigationCSS.profil_nickname}
            >
              {`${fullName} ${lastName}`}
            </a>
          </li>
          <NavLink
            to="./settingsProfil"
            className={(NavigationCSS.profil_settings, NavigationCSS.nav_a)}
            onClick={() => {
              setToggleClass((prevState: boolean) => !prevState);
            }}
          >
            <li className={NavigationCSS.profil_settings}>
              <img src={SettingsIMG} alt="" className={NavigationCSS.nav_img} />
              Настройки
            </li>
          </NavLink>
          <NavLink
            to="./questions"
            className={NavigationCSS.nav_a}
            onClick={() => {
              exit();
              setToggleClass((prevState: boolean) => !prevState);
            }}
          >
            <li className={NavigationCSS.profil_settings}>
              <img src={ExitIMG} alt="" className={NavigationCSS.nav_img} />
              Выход
            </li>
          </NavLink>
          <NavLink
            to="./myFeed"
            className={NavigationCSS.nav_a}
            onClick={() => setToggleClass((prevState: boolean) => !prevState)}
          >
            <li className={NavigationCSS.nav_li}>
              <img src={allTagsIMG} alt="" className={NavigationCSS.nav_img} />
              Моя лента
            </li>
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
          <li className={NavigationCSS.profil_signin}>
            <NavLink to="/SignIn" className={NavigationCSS.nav_a}>
              <img src={signInIMG} alt="" className={NavigationCSS.nav_img} />
              Войти на сайт
            </NavLink>
          </li>
        </div>
        <NavLink
          to="/questions"
          className={NavigationCSS.nav_a}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <li className={NavigationCSS.nav_li}>
            <img
              src={allQuestionsIMG}
              alt=""
              className={NavigationCSS.nav_img}
            />
            Все вопросы
          </li>
        </NavLink>
        <NavLink
          to="./tags"
          className={NavigationCSS.nav_a}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <li className={NavigationCSS.nav_li}>
            <img src={allTagsIMG} alt="" className={NavigationCSS.nav_img} />
            Все теги
          </li>
        </NavLink>
        <NavLink
          to="./users"
          className={NavigationCSS.nav_a}
          onClick={() => setToggleClass((prevState: boolean) => !prevState)}
        >
          <li className={NavigationCSS.nav_li}>
            <img src={usersIMG} alt="" className={NavigationCSS.nav_img} />
            Пользователи
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};
export default Navigation;
