import React, { useState, useEffect } from "react";
import UsersCSS from "./Users.module.css";
import UsersProfilIMG from "../../../../../../images/photoProfil.png";
import { NavLink, Link } from "react-router-dom";
interface User {
  answers: string;
  email: string;
  fullname: string;
  img: string;
  lastname: string;
  nickname: string;
  questions: string;
  user_id: string;
}
const getInfomationAboutUser = async (
  setUsers: React.Dispatch<React.SetStateAction<{}[]>>
) => {
  const res = await fetch("http://localhost:9999/getInformationAboutUser", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  setUsers(data.body);
};
const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getInfomationAboutUser(setUsers);
  }, [setUsers]);

  return (
    <div className={`${UsersCSS["users-container"]}`}>
      <h3
        className={`${UsersCSS["users-container_title"]} ${UsersCSS["users-container_outline"]}`}
      >
        Пользователи
      </h3>
      <div className={`${UsersCSS["users-content"]}`}>
        {users
          .map((user: User, index: number) => {
            return (
              <div
                className={`${UsersCSS["users-card"]} ${UsersCSS["users-card_p"]} ${UsersCSS["users-card_outline"]}`}
                key={index}
              >
                <NavLink
                  to={`/users/${user.user_id}`}
                  className={`${UsersCSS["users-card__image"]}`}
                >
                  <img
                    src={user.img !== "" ? user.img : UsersProfilIMG}
                    alt=""
                  />
                </NavLink>
                <NavLink
                  to={`/users/${user.user_id}`}
                  className={`${UsersCSS["users-card__nickname"]} ${UsersCSS["users-card__nickname_p"]} ${UsersCSS["users-card__nickname_size"]}`}
                >
                  {user.fullname !== "" ? `${user.fullname}` : user.nickname}
                </NavLink>
                <div
                  className={`${UsersCSS["users-card__stat"]} ${UsersCSS["users-card__stat_p"]} ${UsersCSS["users-card__stat_outline"]}`}
                >
                  {user.answers !== "0" ? (
                    <Link
                      to={`/users/${user.user_id}`}
                      state={{ question: "Ответы" }}
                      className={`${UsersCSS["users-card__stat-link"]} ${UsersCSS["users-card__stat-link_p"]} ${UsersCSS["users-card__stat-link_size"]}`}
                    >
                      Ответов ({user.answers})
                    </Link>
                  ) : (
                    <span
                      className={`${UsersCSS["users-card__stat-link_inactive"]}`}
                    >
                      Ответов ({user.answers})
                    </span>
                  )}
                  |
                  {user.questions !== "0" ? (
                    <Link
                      to={`/users/${user.user_id}`}
                      state={{ question: "Вопросы" }}
                      className={`${UsersCSS["users-card__stat-link"]} ${UsersCSS["users-card__stat-link_p"]} ${UsersCSS["users-card__stat-link_size"]}`}
                    >
                      Вопросов ({user.questions})
                    </Link>
                  ) : (
                    <span
                      className={`${UsersCSS["users-card__stat-link_inactive"]}`}
                    >
                      Вопросов ({user.questions})
                    </span>
                  )}
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};
export default Users;
