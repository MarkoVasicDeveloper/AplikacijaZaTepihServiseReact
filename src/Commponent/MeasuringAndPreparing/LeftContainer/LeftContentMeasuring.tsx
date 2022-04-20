import { useState } from "react";
import DatePicker from "react-date-picker";
import "./LeftContentMeasuring.css";
import { useUser } from "../../../Context/UserContext";
import api from "../../../api/api";
import { useReceptionInfo } from "../../../Context/ReceptionInfoContext";

export default function LeftContentMeasuring() {
  const [date, onChangeDate] = useState(new Date());

  const [receptionUserId, setReceptionUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfCarpet, setNumberOfCarpet] = useState("");
  const [numberOfTracks, setNumberOfTracks] = useState("");
  const [note, setNote] = useState("");
  const [dateAt, setDateAt] = useState("");
  const [receiverWorker, setReceivedWorker] = useState("");

  const { user } = useUser() as any;
  const { reception, setReceptionEvent } = useReceptionInfo() as any;

  function sendData() {
    api(
      `api/carpetReception/getReceptionById/${receptionUserId}/${user.userId}`,
      "post",
      {}
    ).then((res: any) => {
      if (res.data.statusCode === -5001) return setReceptionEvent({ show: 0 });
      setName(res.data.clients.name);
      setSurname(res.data.clients.surname);
      setAddress(res.data.clients.address);
      setPhone(res.data.clients.phone);
      setNumberOfCarpet(res.data.numberOfCarpet);
      setNumberOfTracks(res.data.numberOfTracks);
      setNote(res.data.note);
      setDateAt(res.data.dateAt.split("T")[0]);
      const dimension = {} as any;
      new Array(res.data.numberOfCarpet + res.data.numberOfTracks)
        .fill(0)
        .forEach((_, index: number) => {
          dimension[`Tepih/Staza ${index}`] = {
            width: "",
            height: "",
            price: "",
          };
        });

      setReceptionEvent({
        date: date.toISOString().split("T")[0],
        clientId: res.data.clientsId,
        carpetReceptionUserId: receptionUserId,
        carpetReceptionId: res.data.carpetReception,
        forPay: 0,
        workerReceivedId: res.data.workerId,
        prepared: res.data.prepare,
        show:
          res.data.numberOfCarpet + res.data.numberOfTracks - res.data.prepare,
        dimensions: dimension,
      });
      api(`api/worker/${res.data.workerId}/${user.userId}`, "get", {}).then(
        (res) => setReceivedWorker(res.data.name)
      );
    });
  }

  return (
    <section id="leftContentMeasuring">
      <div className="carpetId">
        <label>
          Unesite <span>ID</span> broj tepiha:
        </label>
        <input
          type="number"
          name="id"
          id="carpetId"
          value={receptionUserId}
          onChange={(e) => setReceptionUserId(e.target.value)}
        />
        <button onClick={() => sendData()}>Posalji</button>
      </div>
      <div className="userInfo">
        <div className="info">
          <label>Ime:</label>
          <p>{name}</p>
        </div>
        <div className="info">
          <label>Prezime:</label>
          <p>{surname}</p>
        </div>
        <div className="info">
          <label>Adresa:</label>
          <p>{address}</p>
        </div>
        <div className="info">
          <label>Telefon:</label>
          <p>{phone}</p>
        </div>
        <div className="info">
          <label>Broj tepiha:</label>
          <p>{numberOfCarpet}</p>
        </div>
        <div className="info">
          <label>Broj staza:</label>
          <p>{numberOfTracks}</p>
        </div>
      </div>
      <div className="userInfo">
        <div className="info">
          <label>Vreme prijema:</label>
          <p>{dateAt}</p>
        </div>
        <div className="info">
          <label>Radnik:</label>
          <p>{receiverWorker}</p>
        </div>

        <div className="info">
          <label>Napomena:</label>
          <p>{note}</p>
        </div>
        <div className="date">
          <label htmlFor="deliveryDate">Dan isporuke je:</label>
          <DatePicker
            name="deliveryDate"
            value={date}
            onChange={onChangeDate}
          />
        </div>
      </div>
      <div className="forPay">
        <p>
          ZA NAPLATU: &nbsp;{" "}
          <span>{reception.forPay ? reception.forPay + " din" : " din"}</span>
        </p>
      </div>
    </section>
  );
}
