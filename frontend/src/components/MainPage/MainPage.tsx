import React, { useState } from "react";
import MainPageCSS from "./MainPage.module.css";
import Header from "./ComponentsMainPage/Header/Header";
import Navigation from "./ComponentsMainPage/Navigation/Navigation";
import QuestionPanel from "./ComponentsMainPage/QuestionPanel/QuestionPanel";
import Main from "./ComponentsMainPage/Main/Main";
import Aside from "./ComponentsMainPage/Aside/Aside";
import Footer from "./ComponentsMainPage/Footer/Footer";
const MainPage: React.FC = () => {
  let [toggleClass, setToggleClass] = useState(true);
  let [hideNavImg, setHideNavImg] = useState(false);
  return (
    <div className={MainPageCSS.container}>
      <Header />
      <QuestionPanel setHideNavImg={setHideNavImg} toggleClass={toggleClass} />
      <Navigation
        hideNavImg={hideNavImg}
        toggleClass={toggleClass}
        setToggleClass={setToggleClass}
      />
      <Main toggleClass={toggleClass} />
      <Aside />
      <Footer toggleClass={toggleClass} />
    </div>
  );
};
export default MainPage;
