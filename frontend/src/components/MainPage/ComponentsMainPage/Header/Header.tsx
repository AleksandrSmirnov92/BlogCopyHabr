import React from "react";
import HeaderCSS from "./Header.module.css";
const Header = () => {
  return (
    <header className={`${HeaderCSS.header} ${HeaderCSS.hide_tablet}`}>
      <div className={HeaderCSS.header_title}>
        <h1>Смир</h1>
        <span className={HeaderCSS.headerQA}>Q&A</span>
      </div>
    </header>
  );
};

export default Header;
