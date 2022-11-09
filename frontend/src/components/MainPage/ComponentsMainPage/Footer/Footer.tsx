import React from "react";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={FooterCSS.footer}>
      <a href="#" className={FooterCSS.feedBack}>
        Обратная связь
      </a>
    </footer>
  );
};
export default Footer;
