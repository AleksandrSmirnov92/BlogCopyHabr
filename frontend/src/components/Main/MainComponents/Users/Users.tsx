import React from "react";
import UsersCSS from "./Users.module.css";
import UsersProfilIMG from "../../../../images/photoProfil.png";
const Users = () => {
  return (
    <div className={UsersCSS.mainContainer}>
      <h3 className={UsersCSS.usersText}>Пользователи</h3>
      <div className={UsersCSS.usersContainer}>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Aleksandr
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswer}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Kostya
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswe}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Marina
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswer}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Sveta
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswer}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Sergey
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswer}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
        <div className={UsersCSS.userCard}>
          <a href="#" className={UsersCSS.photoProfil}>
            <img src={UsersProfilIMG} className={UsersCSS.photoProfil} />
          </a>
          <a href="#" className={UsersCSS.nickName}>
            Anton
          </a>
          <span className={UsersCSS.usersResponce}>
            <a href="#" className={UsersCSS.usersCountAnswer}>
              4К ответов
            </a>{" "}
            | 0 вопросов{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Users;
