import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faKey,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useUser } from "../../Context/UserContext";

import "./LogIn.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [pay, setPay] = useState(false);

  const navigate = useNavigate();

  const { user, setUserEvent } = useUser() as any;

  function sendSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setMessage(false);
    api(
      "auth/user",
      "post",
      {
        email: email,
        password: password,
      },
      "user"
    )
      .then((res) => {
        if (res.data.token !== undefined) {
          localStorage.setItem("api_tokenuser", res.data.token);
          localStorage.setItem("api_refresh_tokenuser", res.data.refreshToken);

          api(`api/user/getUserById/${res.data.Id}`, "post", {}, "user").then(
            (res) => {
              setUserEvent({
                userId: res.data.userId,
                userName: res.data.name,
                userLogIn: true,
              });
            }
          );

          api(`api/subscriber/${user.userId}`, "get", {})
            .then((res) => {
              if (
                res.data.length !== 0 &&
                res.data[0].expireAt > new Date().toISOString().split("T")[0]
              )
                return navigate("/workerlogin");

              if (res.data.length === 0) {
                var date = new Date();
                date.setDate(date.getDate() + 15);

                api("api/subscriber/add", "post", {
                  userId: localStorage.getItem("user"),
                  timeAt: new Date().toISOString().split("T")[0],
                  expireAt: date.toISOString().split("T")[0],
                  price: 0,
                })
                  .then(() => navigate("/workerlogin"))
                  .catch((error) => console.log(error.data));
              } else {
                setPay(true);
              }
            })
            .catch((error) => console.log(error.data));
        } else {
          setMessage(true);
        }
      })
      .catch((error) => console.log(error.data));
  }

  return (
    <div>
      <section id="logIn">
        <div className="form-holder">
          <div className="form-header">
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              onClick={() => navigate("/")}
            />
            <h2>Log In</h2>
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div
              className={message === false ? "hiddenMessage" : "showMessage"}
            >
              <p>Mail ili lozinka nisu tacni!</p>
            </div>

            <div className={pay === false ? "hiddenMessage" : "showMessage"}>
              <p>
                Pretplata istekla. Molimo produzite vasu pretplatu. Poslali smo
                vam podatke na email. Hvala!
              </p>
            </div>
            <button onClick={(e) => sendSubmit(e)}>Login</button>
          </div>

          <div className="form-footer">
            <p>
              Nemate nalog?
              <span>
                <Link to="/singup">Sing Up</Link>
              </span>
            </p>
            <p>Zaboravili ste password?</p>
          </div>
        </div>
      </section>
    </div>
  );
}
