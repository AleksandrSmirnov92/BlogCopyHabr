import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import QuestionPanel from "./components/QuestionPanel/QuestionPanel";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Navigation />
        <QuestionPanel />
        <Main />
        <Aside />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
