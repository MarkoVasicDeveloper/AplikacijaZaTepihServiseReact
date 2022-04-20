import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import CarpetReceptionsPage from "./Commponent/carpetReceptionPage/CarpetReceptionsPage";
import DeliveryPage from "./Commponent/DelivertPage/DeliveryPage";
import HomePage from "./Commponent/HomePage/HomePage";
import LetsStart from "./Commponent/LetsStart/LetsStart";
import Login from "./Commponent/LogIn/Login";
import MeasuringAndPreparingCarpet from "./Commponent/MeasuringAndPreparing/MeasuringAndPreparingCarpet";
import Scheduling from "./Commponent/SchedulingPage/Scheduling";
import SingUp from "./Commponent/SingUp/SingUp";
import WorkerLogin from "./Commponent/WorkerLogin/WorkerLogin";
import WorkerSingUp from "./Commponent/WorkerSingUp/WorkerSingUp";
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
