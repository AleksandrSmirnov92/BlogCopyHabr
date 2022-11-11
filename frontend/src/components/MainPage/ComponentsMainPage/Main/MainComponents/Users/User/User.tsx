import React from "react";
import UserCSS from "./User.module.css";
import photoProfilIMG from "../../../../../../../images/photoProfil.png";
import { useParams } from "react-router-dom";
const User = (props: any) => {
  let { userId } = useParams();
  let user = props.users.find((item: any) => item.id === userId);
  return (
    <div className={UserCSS.mainContainer}>
      <div className={UserCSS.avatarAndName}>
        <a href="#" className={UserCSS.avatar}>
          <img src={photoProfilIMG} className={UserCSS.imgAvatar} />
        </a>
        <span className={UserCSS.userNickName}>{user.name}</span>
        <span className={UserCSS.aboutUser}>
          {" "}
          Начинающий Frontend Разработчик
        </span>
      </div>
      <div className={UserCSS.navigationPanel}>
        <a href="#" className={UserCSS.links}>
          <span>Информация</span>
        </a>
        <a href="#" className={UserCSS.links}>
          <span>Ответы</span>
        </a>
      </div>
      <div className={UserCSS.informationPanel}>
        <div className="contacts">
          <h4 className={UserCSS.text}>Контакты</h4>
          <span className={UserCSS.contacts}>
            GitHab:
            <a href="#" className={UserCSS.contacts}>
              github.com/AleksandrSmirnov92
            </a>
          </span>
          <span className={UserCSS.contacts}>
            E-mail:
            <a href="#" className={UserCSS.contacts}>
              Ryan00@mail.ru
            </a>
          </span>
        </div>
        <div className={UserCSS.location}>
          <h4 className={UserCSS.text}>Местоположение</h4>
          <span className={UserCSS.location}>
            Россия,Московская область,Дубна
          </span>
        </div>
      </div>
    </div>
  );
};
export default User;
