import {
  faArrowLeftLong,
  faKey,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { saveRefreshToken, saveToken } from "../../../api/api";
import { useAnalusis } from "../../../Context/AnalusisContext";
import { useUser } from "../../../Context/UserContext";
import { getAnalusisData } from "../../../misc/Function/Analusis/getAnalusisData";
import "./LoginAdministrator.css";

export default function LogInAdministrator() {
  const { user } = useUser() as any;
  const { setAnalusisEvent } = useAnalusis() as any;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setMessage(false);
    const admin = await api(
      "auth/administrator",
      "post",
      { username, password },
      "user"
    );
    if (admin.data.token === undefined) return setMessage(true);
    saveToken("administrator", admin.data.token);
    saveRefreshToken("administrator", admin.data.refreshToken);

    localStorage.setItem("administrator", admin.data.Id);
    setAnalusisEvent(await getAnalusisData(user.userId));
    navigate("/administrator/analysis");
  }

  return (
    <section id="administratorLogIn">
      <div className="adminLogInContent">
        <div className="form-header">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            onClick={() => navigate("/reception")}
          />
          <h1>Admin Login</h1>
        </div>
        <div className="input-one">
          <div>
            <FontAwesomeIcon icon={faSignature} />
          </div>

          <input
            type="text"
            placeholder="Ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="input-two">
          <div>
            <FontAwesomeIcon icon={faKey} />
          </div>

          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="submit-btn">
          <div className={message === false ? "hiddenMessage" : "showMessage"}>
            <p>Ime ili lozinka nisu tacni!</p>
          </div>
          <button onClick={(e) => sendSubmit(e)}>Login</button>
        </div>
      </div>
    </section>
  );
}
