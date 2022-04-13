import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import PrivacyPolicy from "./PrivacyPolicy";
import PageNotFound from "./PageNotFound";
import { LanguageContextProvider } from "./Contexts/LanguageContext";

ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
