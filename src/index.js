import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import BackOfficeLayout from "layouts/Back-Office/BackOffice.js";
import RTLLayout from "layouts/RTL/RTL.js";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import CommunityContext from "contexts/CommunityContext";
import Login from "views/Login";
import Register from "views/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <CommunityContext>
          <BackgroundColorWrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/rtl/*" element={<RTLLayout />} />
                <Route path="/back-office/*" element={<BackOfficeLayout BackOfficeLayout={true}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          </BackgroundColorWrapper>
    </CommunityContext>
  </ThemeContextWrapper>
);
