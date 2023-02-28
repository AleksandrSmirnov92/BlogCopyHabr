import React, { useEffect, useState } from "react";
import UserCSS from "./User.module.css";
import photoProfilIMG from "../../../../../../../images/photoProfil.png";
import { useParams } from "react-router-dom";
interface ResponseData {
  message: string;
  body: {
    user_id: string;
    img: string;
    fullname: string;
    lastname: string;
    briefly_about_yourself: string;
    contacts: string;
    linktocontacts: string;
    country: string;
    region: string;
    town: string;
    informattion_about_user: string;
  };
}
const getSettingsInformation = async (
  userId: string,
  setPathImg: React.Dispatch<React.SetStateAction<string>>,
  setFullName: React.Dispatch<React.SetStateAction<string>>,
  setLastName: React.Dispatch<React.SetStateAction<string>>,
  setBrieflyAboutYourself: React.Dispatch<React.SetStateAction<string>>,
  setInformattionAboutUser: React.Dispatch<React.SetStateAction<string>>,
  setContacts: React.Dispatch<React.SetStateAction<string>>,
  setLinkContacts: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setRegion: React.Dispatch<React.SetStateAction<string>>,
  setTown: React.Dispatch<React.SetStateAction<string>>
) => {
  const res = await fetch(`/getInformationAboutUser/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data: ResponseData = await res.json();
  let {
    img,
    fullname,
    lastname,
    briefly_about_yourself,
    contacts,
    linktocontacts,
    country,
    region,
    town,
    informattion_about_user,
  } = data.body;
  setPathImg(img);
  setFullName(fullname);
  setLastName(lastname);
  setBrieflyAboutYourself(briefly_about_yourself);
  setInformattionAboutUser(informattion_about_user);
  setContacts(contacts);
  setLinkContacts(linktocontacts);
  setCountry(country);
  setRegion(region);
  setTown(town);
};
const User: React.FC = () => {
  let { userId } = useParams();
  let [fullName, setFullName] = useState("");
  let [lastName, setLastName] = useState("");
  let [brieflyAboutYourself, setBrieflyAboutYourself] = useState("");
  let [pathImg, setPathImg] = useState("");
  let [contacts, setContacts] = useState("");
  let [linkToContacts, setLinkContacts] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");
  let [town, setTown] = useState("");
  let [informattionAboutUser, setInformattionAboutUser] = useState("");

  useEffect(() => {
    getSettingsInformation(
      userId,
      setPathImg,
      setFullName,
      setLastName,
      setBrieflyAboutYourself,
      setInformattionAboutUser,
      setContacts,
      setLinkContacts,
      setCountry,
      setRegion,
      setTown
    );
  }, []);
  return (
    <div className={UserCSS.user_container}>
      <header className={UserCSS.user_header}>
        <a
          href={`http://localhost:3000/users/${localStorage.getItem("userId")}`}
          className={UserCSS.user_avatar}
        >
          <img src={pathImg === "" ? photoProfilIMG : pathImg} alt="" />
        </a>
        <span className={UserCSS.user_title}>
          {fullName} {lastName}
        </span>
        <span className={UserCSS.user_subtitle}> {brieflyAboutYourself}</span>
      </header>
      <nav className={UserCSS.nav}>
        <span>Информация</span>
      </nav>
      <div className={UserCSS.user_info_block}>
        <h4>{informattionAboutUser !== "" ? "Обо мне" : ""}</h4>
        <span> {informattionAboutUser} </span>

        <h4>{contacts !== "Контакты" ? "Контакты" : ""}</h4>
        <span>
          {contacts !== "Контакты" ? `${contacts} :` : ""}
          <a href={linkToContacts}>{linkToContacts}</a>
        </span>

        <h4>{country !== "Страна" ? "Местоположение" : ""}</h4>
        <span>
          {country !== "Страна" ? `${country},${region},${town}` : ""}
        </span>
      </div>
    </div>
  );
};
export default User;
