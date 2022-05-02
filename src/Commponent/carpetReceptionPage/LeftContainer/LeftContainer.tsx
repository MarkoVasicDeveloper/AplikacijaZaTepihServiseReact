import { MouseEvent, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useClient } from "../../../Context/ClientContext";
import { useUser } from "../../../Context/UserContext";
import { useWorker } from "../../../Context/WorkerContext";
import {
  AddClient,
  AddReception,
  PrepareClientObject,
} from "../../../misc/Function/CarpetReception/SendData";
import {
  CarpetReceptionLeft,
  initialState,
} from "../../../Reducers/CarpetReceptionLeft";
import "./LeftContainer.css";

export default function LeftContainer() {
  const navigator = useNavigate();

  const { user } = useUser() as any;
  const { worker } = useWorker() as any;
  const { setClientEvent } = useClient() as any;

  const [state, dispatch] = useReducer(CarpetReceptionLeft, initialState);

  useEffect(() => {
    if (!user.userLogIn) return navigator("/login");
    async function setReceptionNumber() {
      const lastNumberReception = await api(
        `api/carpetReception/getBigistReceptionByUser/${user.userId}`,
        "post",
        {}
      );
      if (lastNumberReception.data.length === 0)
        return localStorage.setItem("reception_user", "1");

      localStorage.setItem(
        "reception_user",
        lastNumberReception.data[0].carpetReceptionUser + 1
      );
    }

    setReceptionNumber();
  }, [navigator, user.userId, user.userLogIn]);

  async function sendData(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const addClient = await AddClient(
      state.name,
      state.surname,
      state.address,
      state.phone,
      user.userId
    );

    const addReception = await AddReception(
      addClient,
      user.userId,
      state.numberOfCarpet,
      state.numberOfTracks,
      state.note,
      worker.workerId
    );

    setClientEvent(PrepareClientObject(addReception));
    dispatch({ type: "setEmpty" });
  }

  return (
    <section id="leftContainer">
      <div className="headline">
        <h2>Prijem Tepiha</h2>
      </div>
      <div className="clientInformation">
        <h3>Podaci o klijentu</h3>
        <div className="clientInput">
          <label htmlFor="name">Ime:</label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "field", field: "name", value: e.target.value })
            }
          />
        </div>
        <div className="clientInput">
          <label htmlFor="surname">Prezime:</label>
          <input
            type="text"
            id="surname"
            value={state.surname}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "surname",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="clientInput">
          <label htmlFor="address">Adresa:</label>
          <input
            type="text"
            id="address"
            value={state.address}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "address",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="clientInput">
          <label htmlFor="phone">Telefon:</label>
          <input
            type="number"
            id="phone"
            value={state.phone}
            onChange={(e) =>
              dispatch({ type: "field", field: "phone", value: e.target.value })
            }
          />
        </div>
      </div>

      <div className="clientInformation">
        <h3>Popis tepiha</h3>
        <div className="clientInput">
          <label htmlFor="carpets">Broj tepiha:</label>
          <input
            type="number"
            id="carpets"
            value={state.numberOfCarpet}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "numberOfCarpet",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="clientInput">
          <label htmlFor="tracks">Broj staza:</label>
          <input
            type="number"
            id="tracks"
            value={state.numberOfTracks}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "numberOfTracks",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="clientInput">
          <label htmlFor="note">Napomena:</label>
          <textarea
            name="note"
            id="note"
            cols={30}
            rows={10}
            value={state.note}
            onChange={(e) =>
              dispatch({ type: "field", field: "note", value: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      <div className="sendButton">
        <button onClick={(e) => sendData(e)}>Posalji...</button>
      </div>
    </section>
  );
}
