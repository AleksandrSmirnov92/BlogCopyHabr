import React, { useState } from "react";
import MainPageCSS from "./MainPage.module.css";
import Header from "./ComponentsMainPage/Header/Header";
import Navigation from "./ComponentsMainPage/Navigation/Navigation";
import QuestionPanel from "./ComponentsMainPage/QuestionPanel/QuestionPanel";
import Main from "./ComponentsMainPage/Main/Main";
import Aside from "./ComponentsMainPage/Aside/Aside";
import Footer from "./ComponentsMainPage/Footer/Footer";
const MainPage = () => {
  let [toggleClass, setToggleClass] = useState(true);
  return (
    <div className={MainPageCSS.container}>
      {/* <Navigation toggleClass={toggleClass} setToggleClass={setToggleClass} /> */}
      <div
        className={
          toggleClass ? MainPageCSS.content : MainPageCSS.content_active
        }
      >
        <Header />
        <Navigation toggleClass={toggleClass} setToggleClass={setToggleClass} />
        <QuestionPanel />
        <Main />
        <Aside />
        <Footer />
      </div>
    </div>
  );
};
export default MainPage;
