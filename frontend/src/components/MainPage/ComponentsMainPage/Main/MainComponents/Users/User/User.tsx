import React, { useEffect, useState } from "react";
import UserCSS from "./User.module.css";
import photoProfilIMG from "../../../../../../../images/photoProfil.png";
import { useParams } from "react-router-dom";
const User = (props: any) => {
  let { userId } = useParams();
  let user = props.users.find((item: any) => item.id === userId);
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
  const getSettingsInformation = async () => {
    const res = await fetch(`/getInformationAboutUser/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.body);
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
    setFullName(fullname);
    setLastName(lastname);
    setBrieflyAboutYourself(briefly_about_yourself);
    setPathImg(img);
    setContacts(contacts);
    setLinkContacts(linktocontacts);
    setCountry(country);
    setRegion(region);
    setTown(town);
    setInformattionAboutUser(informattion_about_user);
  };
  useEffect(() => {
    getSettingsInformation();
  }, []);
  return (
    <div className={UserCSS.mainContainer}>
      <div className={UserCSS.avatarAndName}>
        <a href="#" className={UserCSS.avatar}>
          <img
            src={pathImg === "" ? photoProfilIMG : pathImg}
            className={UserCSS.imgAvatar}
          />
        </a>
        <span className={UserCSS.userNickName}>
          {fullName} {lastName}
        </span>
        <span className={UserCSS.aboutUser}> {brieflyAboutYourself}</span>
      </div>
      <div className={UserCSS.navigationPanel}>
        <a
          href={`http://localhost:3000/users/${localStorage.getItem("userId")}`}
          className={UserCSS.links}
        >
          <span>Информация</span>
        </a>
        {/* <a href="#" className={UserCSS.links}>
          <span>Ответы</span>
        </a> */}
      </div>
      <div className={UserCSS.informationPanel}>
        {informattionAboutUser}
        <div>
          <h4 className={UserCSS.text}>
            {contacts !== "Контакты" ? "Контакты" : ""}
          </h4>
          <span className={UserCSS.contacts}>
            {contacts !== "Контакты" ? `${contacts} :` : ""}
            <a href={linkToContacts} className={UserCSS.contacts}>
              {linkToContacts}
            </a>
          </span>
        </div>
        <div className={UserCSS.location}>
          <h4 className={UserCSS.text}>
            {country !== "Страна" ? "Местоположение" : ""}
          </h4>
          <span className={UserCSS.location}>
            {country !== "Страна" ? `${country},${region},${town}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};
export default User;
