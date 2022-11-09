import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import SignIn from "./components/AuthorizationPage/SignIn/SignIn";
import SignUp from "./components/AuthorizationPage/SignUp/SignUp";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        {/* <Route path="/mainPage/*" element={<MainPage />} /> */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignIn/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
