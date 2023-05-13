import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import AskQuestion from "./MainComponents/AskQuestion/AskQuestion";
import Tags from "./MainComponents/Tags/Tags";
import Tag from "./MainComponents/Tags/Tag/Tag";
import Users from "./MainComponents/Users/Users";
import User from "./MainComponents/Users/User/User";
import MyFeed from "./MainComponents/myFeed/myFeed";
// import SignIn from "../../../AuthorizationPage/SignIn/SignIn";
import QuestionInfo from "./MainComponents/AllQuestions/QuestionInfo/QuestionInfo";
import getCookie from "../../../../helpers/getCookie";

const Main = ({ toggleClass }: any) => {
  // let navigate = useNavigate();
  // let [userIsLogged, setUseuserIsLogged] = useState(null);
  const RequireAuth: any = ({ children }: any) => {
    let userIsLogged =
      localStorage.getItem("userId") === null && getCookie("nickname") === ""
        ? true
        : false;
    if (userIsLogged) {
      console.log(window.location);
      return (window.location.href = `http://${window.location.host}/SignIn`);
    } else {
      return children;
    }
  };
  // useEffect(() => {
  //   setUseuserIsLogged(
  //     localStorage.getItem("userId") === null && getCookie("nickname") === ""
  //       ? true
  //       : false
  //   );
  // }, [userIsLogged]);
  return (
    <main
      className={
        toggleClass ? MainCSS.main : `${MainCSS.main} ${MainCSS.main_active}`
      }
    >
      <Routes>
        <Route
          path="/settingsProfil"
          element={
            <RequireAuth>
              <ProfileSettings />
            </RequireAuth>
          }
        />
        <Route path="/" element={<AllQuestions />} />
        <Route path="/questions" element={<AllQuestions />} />
        <Route
          path="/askQuestions"
          element={
            <RequireAuth>
              <AskQuestion />
            </RequireAuth>
          }
        />
        <Route
          path="/myFeed"
          element={
            <RequireAuth>
              <MyFeed />
            </RequireAuth>
          }
        />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tag/:tagId" element={<Tag />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/questionInfo/:questionId" element={<QuestionInfo />} />
      </Routes>
    </main>
  );
};
export default Main;
