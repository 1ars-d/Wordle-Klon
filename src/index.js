import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import PrivacyPolicy from "./PrivacyPolicy";
import PageNotFound from "./PageNotFound";

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);
