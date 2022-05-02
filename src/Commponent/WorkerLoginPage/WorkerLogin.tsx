import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faKey, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useUser } from "../../Context/UserContext";
import { useWorker } from "../../Context/WorkerContext";
import "./WorkerLogIn.css";

export default function WorkerLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const { user } = useUser() as any;
  const { setWorkerEvent } = useWorker() as any;

  const navigation = useNavigate();

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setMessage(false);
    const workerInfo = await api(
      `api/worker/findWorker/${user.userId}`,
      "post",
      { name, password },
      "user"
    );

    if (
      workerInfo.data.statusCode === -5002 &&
      workerInfo.data.statusCode === -5003
    )
      return setMessage(true);
    setWorkerEvent({
      workerName: workerInfo.data.name,
      workerId: workerInfo.data.workerId,
      workerLogIn: true,
    });
    navigation("/reception");
  }

  return (
    <div>
      <section id="logIn">
        <div className="form-holder">
          <div className="form-header">
            <h1 className="loginworker">Log In radnika</h1>
            <div className="social">
              <a href="facebook.com">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="instagram.com">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          <div className="input-one">
            <div>
              <FontAwesomeIcon icon={faMailBulk} />
            </div>

            <input
              type="text"
              placeholder="Ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="input-two">
            <div>
              <FontAwesomeIcon icon={faKey} />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="submit-btn">
            <div className={!message ? "hiddenMessage" : "showMessage"}>
              <p>Ime ili lozinka nisu tacni!</p>
            </div>
            <button onClick={(e) => sendSubmit(e)}>Login</button>
          </div>

          <div className="form-footer">
            <p>
              Nov radnik?
              <span>
                <Link to="/workersingup">Sing Up</Link>
              </span>
            </p>
            <p>Zaboravili ste password?</p>
          </div>
        </div>
      </section>
    </div>
  );
}
