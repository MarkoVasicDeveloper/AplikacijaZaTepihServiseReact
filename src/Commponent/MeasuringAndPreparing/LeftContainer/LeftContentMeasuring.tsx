import { useReducer, useState } from "react";
import DatePicker from "react-date-picker";
import "./LeftContentMeasuring.css";
import { useUser } from "../../../Context/UserContext";
import { useReceptionInfo } from "../../../Context/ReceptionInfoContext";
import {
  initialStateMeasuring,
  ClientReducer,
} from "../../../Reducers/MeasuringAndPreparingCarpet/ClientReducer";
import {
  getReception,
  getWorkerName,
} from "../../../misc/Function/MeasuringAndPreparingCarpet/LeftContent.ts/LeftContentFunction";
import {
  DimensionsReducer,
  initialDimensions,
} from "../../../Reducers/MeasuringAndPreparingCarpet/DimensionsReducer";

export default function LeftContentMeasuring() {
  const [date, onChangeDate] = useState(new Date());

  const [receptionUserId, setReceptionUserId] = useState("");
  const [receiverWorker, setReceivedWorker] = useState("");

  const { user } = useUser() as any;
  const { reception, setReceptionEvent } = useReceptionInfo() as any;
  const [state, dispatch] = useReducer(ClientReducer, initialStateMeasuring);
  const [dimensionState, dispatchDimension] = useReducer(
    DimensionsReducer,
    initialDimensions
  );

  async function sendData() {
    const currentReception = await getReception(receptionUserId, user.userId);

    if (currentReception.data.statusCode === -5001)
      return setReceptionEvent({ show: 0 });

    dispatch({ type: "setClientInfo", value: currentReception.data });

    dispatchDimension({
      type: "setEmpty",
      value:
        currentReception.data.numberOfCarpet +
        currentReception.data.numberOfTracks -
        currentReception.data.prepare,
    });

    setReceptionEvent({
      date: date.toISOString().split("T")[0],
      clientId: currentReception.data.clientsId,
      carpetReceptionUserId: receptionUserId,
      carpetReceptionId: currentReception.data.carpetReception,
      forPay: 0,
      workerReceivedId: currentReception.data.workerId,
      prepared: currentReception.data.prepare,
      show:
        currentReception.data.numberOfCarpet +
        currentReception.data.numberOfTracks -
        currentReception.data.prepare,
    });

    setReceivedWorker(await getWorkerName(currentReception, user.userId));
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
          <p>{state.name}</p>
        </div>
        <div className="info">
          <label>Prezime:</label>
          <p>{state.surname}</p>
        </div>
        <div className="info">
          <label>Adresa:</label>
          <p>{state.address}</p>
        </div>
        <div className="info">
          <label>Telefon:</label>
          <p>{state.phone}</p>
        </div>
        <div className="info">
          <label>Broj tepiha:</label>
          <p>{state.numberOfCarpet}</p>
        </div>
        <div className="info">
          <label>Broj staza:</label>
          <p>{state.numberOfTracks}</p>
        </div>
      </div>
      <div className="userInfo">
        <div className="info">
          <label>Vreme prijema:</label>
          <p>{state.dateAt}</p>
        </div>
        <div className="info">
          <label>Radnik:</label>
          <p>{receiverWorker}</p>
        </div>

        <div className="info">
          <label>Napomena:</label>
          <p>{state.note}</p>
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
