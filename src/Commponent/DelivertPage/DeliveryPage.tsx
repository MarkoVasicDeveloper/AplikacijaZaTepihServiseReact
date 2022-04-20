import { useEffect, useState } from "react";
import api from "../../api/api";
import { useUser } from "../../Context/UserContext";
import { useWorker } from "../../Context/WorkerContext";
import { RequestToDelivered } from "../../misc/Function/ExportFunction";
import { errorHandler } from "../../misc/Function/Location";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DeliveryPage.css";

export default function DeliveryPage() {
  const { user } = useUser() as any;
  const { worker } = useWorker() as any;

  const [deliveryArray, setDeliveryArray] = useState([]);
  const [forPay, setForPay] = useState({}) as any;
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  }) as any;

  useEffect(() => {
    async function get() {
      const reception = await api(
        `api/carpetReception/getReceptionByDelivery`,
        "get",
        {}
      );

      setDeliveryArray(
        reception.data.filter(
          (reception: any) =>
            reception.numberOfCarpet + reception.numberOfTracks ===
            reception.prepare
        )
      );

      deliveryArray.forEach(async (reception: any) => {
        const clientCarpet = await api(
          `api/carpet/getAllCarpetByClientId/${reception.carpetReceptionUser}/${user.userId}`,
          "get",
          {}
        );
        const clientBuild = clientCarpet.data.reduce(
          (acc: any, item: any) => acc + item.forPayment,
          0
        );
        setForPay((prev: any) => ({
          ...prev,
          [clientCarpet.data[0].carpetReceptionUser]: clientBuild,
        }));
      });
      GetLocation();
    }
    get();
    return () => {};
  }, [deliveryArray, user.userId]);

  async function delivered(receptionUser: any) {
    setDeliveryArray(
      deliveryArray.filter(
        (reception: any) =>
          reception.carpetReceptionUser !==
          RequestToDelivered(receptionUser, worker.workerId, user.userId)
      )
    );
  }

  function GetLocation() {
    if (!navigator.geolocation)
      return alert(
        "Geolokacija nije podrzana od strane vaseg internet pregledaca"
      );
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      errorHandler,
      { enableHighAccuracy: true, timeout: 90000, maximumAge: 20000 }
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
              <div className="infoReception">
                <div className="info">
                  <p>ID broj:</p>
                  <p>Ime:</p>
                  <p>Prezime:</p>
                  <p>Adresa:</p>
                  <p>Telefon:</p>
                </div>
                <div className="value">
                  <p>{reception.carpetReceptionUser}</p>
                  <p>{reception.clients.name}</p>
                  <p>{reception.clients.surname}</p>
                  <p>{reception.clients.address}</p>
                  <p>{reception.clients.phone}</p>
                </div>
              </div>
              <div className="infoReception">
                <div className="info">
                  <p>Tepisi:</p>
                  <p>Staze:</p>
                  <p>Za naplatu:</p>
                </div>
                <div className="value">
                  <p>{reception.numberOfCarpet}</p>
                  <p>{reception.numberOfTracks}</p>
                  <p>{forPay[reception.carpetReceptionUser]}</p>
                </div>
              </div>
              <div className="buttonReception">
                <button
                  onClick={() =>
                    (window.location.href = `https://www.google.com/maps/dir/${coordinates.lat} ${coordinates.lng}/${reception.clients.address}`)
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
