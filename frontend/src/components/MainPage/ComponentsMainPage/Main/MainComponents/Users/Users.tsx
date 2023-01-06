import React, { useState, useEffect } from "react";
import UsersCSS from "./Users.module.css";
import UsersProfilIMG from "../../../../../../images/photoProfil.png";
import { NavLink } from "react-router-dom";

const Users = (props: any) => {
  const [users, setUsers] = useState([]);
  // console.log(users.users);
  const getInfomationAboutUser = async () => {
    const res = await fetch("http://localhost:9999/getInformationAboutUser", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setUsers(data.body);
  };
  useEffect(() => {
    getInfomationAboutUser();
    console.log("users");
    // console.log(users);
    // получить id пользователя
    // получить photo
    // получить имя
    // получить ответы и вопросы
  }, [setUsers]);
  console.log(users);
  // debugger;
  return (
    <div className={UsersCSS.mainContainer}>
      <h3 className={UsersCSS.usersText}>Пользователи</h3>
      <div className={UsersCSS.usersContainer}>
        {users.map((user: any) => {
          // debugger;
          return (
            <div className={UsersCSS.userCard}>
              <NavLink
                to={`/users/${user.user_id}`}
                className={UsersCSS.photoProfil}
              >
                <img
                  src={user.img !== "" ? user.img : UsersProfilIMG}
                  className={UsersCSS.photoProfil}
                  alt=""
                />
              </NavLink>
              <NavLink
                to={`/users/${user.user_id}`}
                className={UsersCSS.nickName}
              >
                {user.fullname !== "" ? `${user.fullname}` : user.nickname}
              </NavLink>
              <span className={UsersCSS.usersResponce}>
                <a href="#" className={UsersCSS.usersCountAnswer}>
                  4K ответов
                </a>{" "}
                | 0 вопросов{" "}
              </span>
            </div>
            // <div className={UsersCSS.userCard}>
            //   <NavLink
            //     to={`/users/${user.id}`}
            //     className={UsersCSS.photoProfil}
            //   >
            //     <img src={user.photo} className={UsersCSS.photoProfil} alt="" />
            //   </NavLink>
            //   <NavLink to={`/users/${user.id}`} className={UsersCSS.nickName}>
            //     {user.name}
            //   </NavLink>
            //   <span className={UsersCSS.usersResponce}>
            //     <a href="#" className={UsersCSS.usersCountAnswer}>
            //       {user.responseAndQuestions.response}
            //     </a>{" "}
            //     | {user.responseAndQuestions.questions}{" "}
            //   </span>
            // </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
