import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faAddressBook,
  faArrowLeftLong,
  faCity,
  faKey,
  faMailBulk,
  faPhone,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./singUp.css";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(false);
  const [required, setRequired] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (
      name === "" ||
      surname === "" ||
      city === "" ||
      address === "" ||
      phone === "" ||
      email === "" ||
      password === ""
    ) {
      setRequired(true);
      setMessage(true);
      return;
    }
    const addUser = await api("api/user/addUser", "post", {
      email: email,
      password: password,
      name: name,
      surname: surname,
      city: city,
      address: address,
      phone: phone,
    });
    if (addUser.data.statusCode === -10001) return setMessage(true);

    setMessage(false);
    setRedirect(true);
  }

  return (
    <div>
      <section id="singUp">
        <div className="form-holder-singUp">
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
                  <FontAwesomeIcon icon={faSignature} />
                </div>
                <input
                  type="text"
                  placeholder="Prezime"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                ></input>
              </div>
              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faCity} />
                </div>
                <input
                  type="text"
                  placeholder="Grad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faAddressBook} />
                </div>
                <input
                  type="text"
                  placeholder="Adresa"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="right-input-holder">
              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <input
                  type="text"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>
              <div className="input-one-singUp">
                <div>
                  <FontAwesomeIcon icon={faMailBulk} />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  : "Email je zauzet!"}
              </p>
            </div>
            <p style={{ color: "#fec400", margin: "1rem" }}>
              {redirect ? "Poslali smo vam email" : ""}
            </p>
            <div className="btn-div">
              <button onClick={(e) => sendSubmit(e)}>Sing Up</button>
            </div>

            <div className="form-footer-singUp">
              <p>Morate popuniti sva polja!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
