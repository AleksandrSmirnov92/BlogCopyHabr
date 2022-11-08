import React from "react";
import { Route, Routes } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import Tags from "./MainComponents/Tags/Tags";
import Users from "./MainComponents/Users/Users";
const Main = () => {
  return (
    <main className={MainCSS.main}>
      <Routes>
        <Route path="/myProfile" element={<ProfileSettings />} />
        <Route path="/questions" element={<AllQuestions />} />
        {/* <Route path="/" element={<AllQuestions />} /> */}
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<Users />} />/
      </Routes>
    </main>
  );
};
export default Main;
