import React from "react";
import HeaderCSS from "./Header.module.css";
const Header = () => {
  return (
    <header className={HeaderCSS.header}>
      <div className={HeaderCSS.headerText}>
        <h1 className={HeaderCSS.headerH1}>Смир</h1>
        <h1 className={HeaderCSS.headerQA}>Q&A</h1>
      </div>
    </header>
  );
};

export default Header;
