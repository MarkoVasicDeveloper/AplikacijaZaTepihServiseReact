import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useWorker } from "../../Context/WorkerContext";
import {
  filterDeliveryData,
  getBill,
  getDeliveryData,
} from "../../misc/Function/DeliveryPage/GetDeliveryInfo";
import { RequestToDelivered } from "../../misc/Function/DeliveryPage/GetDeliveryInfo";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DeliveryPage.css";

export default function DeliveryPage() {
  const { user } = useUser() as any;
  const { worker } = useWorker() as any;

  const [deliveryArray, setDeliveryArray] = useState([]);
  const [forPay, setForPay] = useState({}) as any;

  useEffect(() => {
    async function get() {
      const receptions = await getDeliveryData();

      setDeliveryArray(filterDeliveryData(receptions));

      setForPay(await getBill(deliveryArray, user.userId));
    }
    get();
  }, []);

  async function delivered(receptionUser: any) {
    setDeliveryArray(
      deliveryArray.filter(
        (reception: any) =>
          reception.carpetReceptionUser !==
          RequestToDelivered(receptionUser, worker.workerId, user.userId)
      )
    );
  }

  return (
    <section id="deliveryPage">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <div className="deliveryContent">
        <div className="delivery">
          {deliveryArray.map((reception: any, index: number) => (
            <div key={index} className="reception">
              <div className="infoReception flex">
                <div className="info">
                  <p>ID broj:</p>
                  <span>{reception.carpetReceptionUser}</span>
                </div>
                <div className="info">
                  <p>Ime:</p>
                  <span>{reception.clients.name}</span>
                </div>
                <div className="info">
                  <p>Prezime:</p>
                  <span>{reception.clients.surname}</span>
                </div>
                <div className="info">
                  <p>Adresa:</p>
                  <span>{reception.clients.address}</span>
                </div>
                <div className="info">
                  <p>Telefon:</p>
                  <span>{reception.clients.phone}</span>
                </div>
              </div>
              <div className="infoReception">
                <div className="info">
                  <p>Tepisi:</p>
                  <span>{reception.numberOfCarpet}</span>
                </div>
                <div className="info">
                  <p>Staze:</p>
                  <span>{reception.numberOfTracks}</span>
                </div>
                <div className="info">
                  <p>Racun:</p>
                  <span>{forPay[reception.carpetReceptionUser]}</span>
                </div>
              </div>
              <div className="buttonReception">
                <button
                  onClick={() =>
                    (window.location.href = `https://www.google.com/maps/dir/${user.coordinates.lat} ${user.coordinates.lng}/${reception.clients.address}`)
                  }
                >
                  Treba ti pomoc da nadjes?
                </button>
                <button
                  onClick={() => delivered(reception.carpetReceptionUser)}
                >
                  Isporuka zavrsena?
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
