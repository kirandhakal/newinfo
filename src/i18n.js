import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug : true ,
    lng : "np",
    resources: {
      en: {
         translation:{
            greeting : "Hi, welcome",
            welcome  : " Hi",
            team : "welcome to team",
            message : " You’re logged in as ",
         },
         },
      np: {
         translation: {
            greeting : "नमस्ते ,स्वागत छ।",
            welcome : " स्वागत",
            team   : "टोलीमा स्वागत छ।",
            message : " तपाईंको इमेल"
         

         },
         },
    },
   
  });

export default i18n;
