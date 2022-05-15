import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Analysis from "./Commponent/Administrator/Analysis/Analysis";
import LogInAdministrator from "./Commponent/Administrator/LogIn/LogIn";
import CarpetReceptionsPage from "./Commponent/carpetReceptionPage/CarpetReceptionsPage";
import DeliveryPage from "./Commponent/DeliveryPage/DeliveryPage";
import DownloadList from "./Commponent/DownloadListPage/DownloadList";
import HomePage from "./Commponent/HomePage/HomePage";
import LetsStart from "./Commponent/LetsStart/LetsStart";
import Login from "./Commponent/LogInPage/Login";
import MeasuringAndPreparingCarpet from "./Commponent/MeasuringAndPreparing/MeasuringAndPreparingCarpet";
import Scheduling from "./Commponent/SchedulingPage/Scheduling";
import SingUp from "./Commponent/SingUpPage/SingUp";
import WorkerLogin from "./Commponent/WorkerLoginPage/WorkerLogin";
import WorkerSingUp from "./Commponent/WorkerSingUpPage/WorkerSingUp";
import User from "./Context/UserContext";
import Worker from "./Context/WorkerContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <User>
        <Worker>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kakopoceti" element={<LetsStart />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workerlogin" element={<WorkerLogin />} />
            <Route path="/workersingup" element={<WorkerSingUp />} />
            <Route path="/reception" element={<CarpetReceptionsPage />} />
            <Route
              path="/measuringandpreparingcarpet"
              element={<MeasuringAndPreparingCarpet />}
            />
            <Route path="/deliverylist" element={<DeliveryPage />} />
            <Route path="/schedulingcarpetretrivals" element={<Scheduling />} />
            <Route path="/downloadlist" element={<DownloadList />} />
            <Route
              path="/administrator/login"
              element={<LogInAdministrator />}
            />
            <Route path="/administrator/analysis" element={<Analysis />} />
          </Routes>
        </Worker>
      </User>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
