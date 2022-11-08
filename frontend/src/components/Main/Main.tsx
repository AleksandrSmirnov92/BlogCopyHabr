import React from "react";
import { Route, Routes } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import Tags from "./MainComponents/Tags/Tags";
const Main = () => {
  return (
    <main className={MainCSS.main}>
      <Routes>
        <Route path="/myProfile" element={<ProfileSettings />} />
        <Route path="/questions" element={<AllQuestions />} />
        {/* <Route path="/" element={<AllQuestions />} /> */}
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </main>
  );
};
export default Main;
