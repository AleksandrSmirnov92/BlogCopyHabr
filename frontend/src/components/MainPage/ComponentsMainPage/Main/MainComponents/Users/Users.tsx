import React, { useState } from "react";
import UsersCSS from "./Users.module.css";
// import UsersProfilIMG from "../../../../../../images/photoProfil.png";
import { NavLink } from "react-router-dom";

const Users = (props: any) => {
  // const [users, setUsers] = useState(props);
  // console.log(users.users);

  // debugger;
  return (
    <div className={UsersCSS.mainContainer}>
      <h3 className={UsersCSS.usersText}>Пользователи</h3>
      <div className={UsersCSS.usersContainer}>
        {props.users.map((user: any) => {
          // debugger;
          return (
            <div className={UsersCSS.userCard}>
              <NavLink
                to={`/users/${user.id}`}
                className={UsersCSS.photoProfil}
              >
                <img src={user.photo} className={UsersCSS.photoProfil} alt="" />
              </NavLink>
              <NavLink to={`/users/${user.id}`} className={UsersCSS.nickName}>
                {user.name}
              </NavLink>
              <span className={UsersCSS.usersResponce}>
                <a href="#" className={UsersCSS.usersCountAnswer}>
                  {user.responseAndQuestions.response}
                </a>{" "}
                | {user.responseAndQuestions.questions}{" "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
