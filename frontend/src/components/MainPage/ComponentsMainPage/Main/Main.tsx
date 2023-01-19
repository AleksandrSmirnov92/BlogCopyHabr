import React from "react";
import { Route, Routes } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import AskQuestion from "./MainComponents/AskQuestion/AskQuestion";
import Tags from "./MainComponents/Tags/Tags";
import Tag from "./MainComponents/Tags/Tag/Tag";
import Users from "./MainComponents/Users/Users";
import User from "./MainComponents/Users/User/User";
import MyFeed from "./MainComponents/myFeed/myFeed";
import Question from "./MainComponents/AllQuestions/Question/Question";
const Main = () => {
  return (
    <main className={MainCSS.main}>
      <Routes>
        <Route path="/settingsProfil" element={<ProfileSettings />} />
        <Route path="/questions" element={<AllQuestions />} />
        <Route path="/askQuestions" element={<AskQuestion />} />
        <Route path="/myFeed" element={<MyFeed />} />
        {/* <Route path="/" element={<AllQuestions />} /> */}
        <Route path="/tags" element={<Tags />} />
        <Route path="/tag/:tagId" element={<Tag />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </main>
  );
};
export default Main;
