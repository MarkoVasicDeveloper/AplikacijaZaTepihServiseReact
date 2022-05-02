import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import {
  editSchedule,
  getAllSchedule,
} from "../../misc/Function/DownloadListPage/SetScheduled";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DownloadList.css";

export default function DownloadList() {
  const { user } = useUser() as any;

  const [downloadArray, setDownloadArray] = useState<[]>([]) as any;

  useEffect(() => {
    async function setSchedule() {
      setDownloadArray([...(await getAllSchedule(user.userId))]);
    }
    setSchedule();
  }, [user.userId]);

  return (
    <section id="deliveryPage">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <div className="deliveryContent">
        <div className="delivery">
          {downloadArray.map((reception: any, index: number) => (
            <div key={index} className="reception">
              <div className="infoReception">
                <div className="info">
                  <p>Ime:</p>
                  <span>{reception.name}</span>
                </div>
                <div className="info">
                  <p>Prezime:</p>
                  <span>{reception.surname}</span>
                </div>
                <div className="info">
                  <p>Adresa:</p>
                  <span>{reception.address}</span>
                </div>
                <div className="info">
                  <p>Telefon:</p>
                  <span>{reception.phone}</span>
                </div>
              </div>
              <div className="infoReception">
                <div className="info infoSchedule">
                  <p>Napomena:</p>
                  <span>{reception.note}</span>
                </div>
              </div>
              <div className="buttonReception">
                <button
                  onClick={() =>
                    (window.location.href = `https://www.google.com/maps/dir/${user.coordinates.lat} ${user.coordinates.lng}/${reception.address}`)
                  }
                >
                  Treba ti pomoc da nadjes?
                </button>
                <button
                  onClick={async () =>
                    setDownloadArray([
                      ...(await editSchedule(
                        reception.schedulingCarpetId,
                        user.userId,
                        downloadArray
                      )),
                    ])
                  }
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
