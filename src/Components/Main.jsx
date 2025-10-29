import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./Main.css"; 

const Main = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (!storedLang) {
      setShowPopup(true);
    } else {
      i18next.changeLanguage(storedLang);
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setShowPopup(false);
  };

  return (
    <div className="main-container">
      <h1 className="main-title">{t("greeting")}</h1>

      {/* <button className="change-btn" onClick={() => setShowPopup(true)}>
        Change Language
      </button> */}

      {/* {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-title">Select Language</h2>
            <div className="popup-buttons">
              <button
                className="lang-btn english"
                onClick={() => handleLanguageSelect("en")}
              >
                English
              </button>
              <button
                className="lang-btn nepali"
                onClick={() => handleLanguageSelect("np")}
              >
                नेपाली
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Main;
