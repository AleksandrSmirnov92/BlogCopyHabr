import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import AskQuestion from "./MainComponents/AskQuestion/AskQuestion";
import Tags from "./MainComponents/Tags/Tags";
import Tag from "./MainComponents/Tags/Tag/Tag";
import Users from "./MainComponents/Users/Users";
import User from "./MainComponents/Users/User/User";
import MyFeed from "./MainComponents/myFeed/myFeed";
import QuestionInfo from "./MainComponents/AllQuestions/QuestionInfo/QuestionInfo";
const Main = ({ toggleClass }: any) => {
  return (
    <main
      className={
        toggleClass ? MainCSS.main : `${MainCSS.main} ${MainCSS.main_active}`
      }
    >
      <Routes>
        <Route path="/settingsProfil" element={<ProfileSettings />} />
        <Route path="/" element={<AllQuestions />} />
        <Route path="/questions" element={<AllQuestions />} />
        <Route path="/askQuestions" element={<AskQuestion />} />
        <Route path="/myFeed" element={<MyFeed />} />
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
