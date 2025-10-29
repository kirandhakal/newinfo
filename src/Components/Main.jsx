import React from "react";
import { useTranslation } from "react-i18next";
import "./Main.css";

const Main = () => {
  const { t } = useTranslation();

  return (
    <div className="main-container">
     
      <h1 className="main-title">{t("greeting")}
        
      </h1>
       {/* <h2>jjj</h2> */}
    </div>
  );
};

export default Main;
