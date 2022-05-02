import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faKey,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useUser } from "../../Context/UserContext";
import "./WorkerSingUp.css";

export default function WorkerSingUp() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(false);
  const [required, setRequired] = useState(false);

  const { user } = useUser() as any;

  const navigate = useNavigate();

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (name === "" || password === "") {
      setRequired(true);
      setMessage(true);
      return;
    }
    const addWorker = await api(`api/worker/addWorker/${user.userId}`, "post", {
      password: password,
      name: name,
    });
    if (addWorker.data.statusCode === -5001) return setMessage(true);
    navigate("/workerlogin");
  }

  return (
    <div>
      <section id="singUp">
        <div className="form-holder-singUp singUp-worker">
          <div className="form-header-singUp">
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              onClick={() => navigate("/")}
            />
            <h1>Sing up</h1>
            <div className="social-singUp">
              <a href="facebook.com">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="instagram.com">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div className="input-holder">
            <div className="left-input-holder">
              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faSignature} />
                </div>
                <input
                  type="text"
                  placeholder="Ime"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faKey} />
                </div>

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="btn-textMesage-holder">
            <div className={!message ? "hiddenMessage" : "showMessageLogin"}>
              <p>
                {required
                  ? "Sva polja moraju biti popunjena"
                  : "Ime je zauzeto!"}
              </p>
            </div>
            <div className="btn-div">
              <button onClick={(e) => sendSubmit(e)}>Sing Up</button>
            </div>

            <div className="form-footer-singUp">
              <p>
                Vec imate nalog?
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
