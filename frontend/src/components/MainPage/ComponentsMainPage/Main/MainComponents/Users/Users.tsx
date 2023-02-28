import React, { useState, useEffect } from "react";
import UsersCSS from "./Users.module.css";
import UsersProfilIMG from "../../../../../../images/photoProfil.png";
import { NavLink } from "react-router-dom";
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
    <div className={UsersCSS.users_container}>
      <h3>Пользователи</h3>
      <div className={UsersCSS.users_block}>
        {users
          .map((user: User, index: number) => {
            return (
              <div className={UsersCSS.user_card} key={index}>
                <NavLink
                  to={`/users/${user.user_id}`}
                  className={UsersCSS.user_avatar}
                >
                  <img
                    src={user.img !== "" ? user.img : UsersProfilIMG}
                    alt=""
                  />
                </NavLink>
                <NavLink
                  to={`/users/${user.user_id}`}
                  className={UsersCSS.users_nickname}
                >
                  {user.fullname !== "" ? `${user.fullname}` : user.nickname}
                </NavLink>
                <div className={UsersCSS.users_stat}>
                  <span
                    className={
                      user.answers !== "0"
                        ? UsersCSS.users_count
                        : UsersCSS.users_notcount
                    }
                  >
                    Ответов ({user.answers})
                  </span>{" "}
                  |
                  <span
                    className={
                      user.questions !== "0"
                        ? UsersCSS.users_count
                        : UsersCSS.users_notcount
                    }
                  >
                    Вопросов ({user.questions})
                  </span>
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
