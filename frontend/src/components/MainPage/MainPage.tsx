import React from "react";
import MainPageCSS from "./MainPage.module.css";
import Header from "./ComponentsMainPage/Header/Header";
import Navigation from "./ComponentsMainPage/Navigation/Navigation";
import QuestionPanel from "./ComponentsMainPage/QuestionPanel/QuestionPanel";
import Main from "./ComponentsMainPage/Main/Main";
import Aside from "./ComponentsMainPage/Aside/Aside";
import Footer from "./ComponentsMainPage/Footer/Footer";
import { NavLink } from "react-router-dom";
const MainPage = () => {
  return (
    <div className={MainPageCSS.container}>
      <Header />
      <Navigation />
      <QuestionPanel />
      <Main />
      <Aside />
      <Footer />
    </div>
  );
};
export default MainPage;
