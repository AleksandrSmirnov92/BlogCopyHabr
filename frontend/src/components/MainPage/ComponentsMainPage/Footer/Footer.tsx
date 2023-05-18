import React from "react";
import FooterCSS from "./Footer.module.css";

const Footer = ({ toggleClass }: any) => {
  return (
    <footer
      className={
        toggleClass
          ? FooterCSS.footer
          : `${FooterCSS.footer} ${FooterCSS.footer_active}`
      }
    >
      <a href="#" className={FooterCSS.feedBack}>
        Обратная связь
      </a>
    </footer>
  );
};
export default Footer;
