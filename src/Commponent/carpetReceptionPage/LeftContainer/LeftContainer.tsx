import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useClient } from "../../../Context/ClientContext";
import { useUser } from "../../../Context/UserContext";
import { useWorker } from "../../../Context/WorkerContext";
import "./LeftContainer.css";

export default function LeftContainer() {
  const navigator = useNavigate();

  const { user } = useUser() as any;
  const { worker } = useWorker() as any;
  const { setClientEvent } = useClient() as any;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [numberOfCarpet, setNumberOfCarpet] = useState("");
  const [numberOfTracks, setNumberOfTracks] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (user.logIn === false) {
      navigator("/login");
      return;
    }

    api(
      `api/carpetReception/getBigistReceptionByUser/${user.userId}`,
      "post",
      {}
    ).then((res) => {
      if (res.data.length !== 0) {
        localStorage.setItem(
          "reception_user",
          res.data[0].carpetReceptionUser + 1
        );
        return;
      }
      localStorage.setItem("reception_user", "1");
    });

    return () => {};
  }, [navigator, user.logIn, user.userId]);

  function sendData(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (name === "" || surname === "" || address === "") return;

    api(`api/clients/addClient/${user.userId}`, "post", {
      name: name,
      surname: surname,
      address: address,
      phone: phone,
    }).then((res) => {
      if (res.status === "error") return;
      api(`api/carpetReception/addReception/${worker.workerId}`, "post", {
        clientsId: res.data.clientsId,
        numberOfCarpet: Number(numberOfCarpet),
        numberOfTracks: Number(numberOfTracks),
        note: note,
        carpet_reception_user: localStorage.getItem("reception_user"),
        userId: user.userId,
      }).then((res) => {
        const lastReception =
          res.data.carpetReceptions[res.data.carpetReceptions.length - 1]
            .carpetReceptionUser;

        setClientEvent({
          name: res.data.name,
          surname: res.data.surname,
          address: res.data.address,
          phone: res.data.phone,
          clientId: res.data.clientsId,
          carpetReceptionUserArray: res.data.carpetReceptions,
          carpetReceptionUser: lastReception,
          numberOfCarpet:
            res.data.carpetReceptions[res.data.carpetReceptions.length - 1]
              .numberOfCarpet,
          numberOfTracks:
            res.data.carpetReceptions[res.data.carpetReceptions.length - 1]
              .numberOfTracks,
        });
        setName("");
        setSurname("");
        setAddress("");
        setPhone("");
        setNote("");
        setNumberOfCarpet("");
        setNumberOfTracks("");
        localStorage.setItem("reception_user", lastReception + 1);
      });
    });
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="clientInput">
          <label htmlFor="surname">Prezime:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="clientInput">
          <label htmlFor="address">Adresa:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="clientInput">
          <label htmlFor="phone">Telefon:</label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={numberOfCarpet}
            onChange={(e) => setNumberOfCarpet(e.target.value)}
          />
        </div>
        <div className="clientInput">
          <label htmlFor="tracks">Broj staza:</label>
          <input
            type="number"
            id="tracks"
            value={numberOfTracks}
            onChange={(e) => setNumberOfTracks(e.target.value)}
          />
        </div>
        <div className="clientInput">
          <label htmlFor="note">Napomena:</label>
          <textarea
            name="note"
            id="note"
            cols={30}
            rows={10}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="sendButton">
        <button onClick={(e) => sendData(e)}>Posalji...</button>
      </div>
    </section>
  );
}
