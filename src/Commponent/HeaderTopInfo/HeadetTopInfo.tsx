import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { useWorker } from "../../Context/WorkerContext";
import "./HeaderTopInfo.css";

export default function HeaderTopInfo() {
  const { user } = useUser() as any;
  const { worker, setWorkerEvent } = useWorker() as any;

  const navigate = useNavigate();

  return (
    <div className="header-reception">
      <div className="washer-logo">
        <h2>WASHER</h2>
      </div>
      <div className="user">
        <p>
          Korisnik: <span>{user.userName}</span>
        </p>
      </div>
      <div className="worker">
        <p>
          Radnik: <span>{worker.workerName}</span>
        </p>
      </div>
      <div className="logOutButton">
        <button
          onClick={() => {
            setWorkerEvent({
              workerName: "",
              workerId: 0,
              workerLogIn: false,
            });
            navigate("/workerlogin");
          }}
        >
          Odjava radnika
        </button>
      </div>
    </div>
  );
}
