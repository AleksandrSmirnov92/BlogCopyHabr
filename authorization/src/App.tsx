import React from "react";
import SignIn from "./Components/SignIn/SignIn";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="Container">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/account" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
