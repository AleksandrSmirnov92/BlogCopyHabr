import React, { useState } from "react";
import MainPageCSS from "./MainPage.module.css";
import Header from "./ComponentsMainPage/Header/Header";
import Navigation from "./ComponentsMainPage/Navigation/Navigation";
import QuestionPanel from "./ComponentsMainPage/QuestionPanel/QuestionPanel";
import Main from "./ComponentsMainPage/Main/Main";
import Aside from "./ComponentsMainPage/Aside/Aside";
import Footer from "./ComponentsMainPage/Footer/Footer";
import { boolean } from "yup";
const MainPage = () => {
  let [toggleClass, setToggleClass] = useState(true);
  return (
    <div className={MainPageCSS.container}>
      <Header />
      <QuestionPanel toggleClass={toggleClass} />
      <Navigation toggleClass={toggleClass} setToggleClass={setToggleClass} />
      <Main toggleClass={toggleClass} />
      <Aside />
      <Footer toggleClass={toggleClass} />
    </div>
  );
};
export default MainPage;
