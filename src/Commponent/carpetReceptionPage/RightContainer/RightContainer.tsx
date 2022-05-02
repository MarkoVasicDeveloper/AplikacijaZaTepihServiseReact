import { useEffect, useState } from "react";
import { useClient } from "../../../Context/ClientContext";
import "./RightContainer.css";

export default function RightContainer() {
  const { client } = useClient() as any;

  const [visits, setVisits] = useState([{}]) as any;

  useEffect(() => {
    function lastVisits() {
      if (client.carpetReceptionUserArray === undefined) return [{}];
      const lastReceptions = client.carpetReceptionUserArray;

      return lastReceptions.map((reception: any) => ({
        date: reception.dateAt.split("T")[0],
        numberOfCarpet: reception.numberOfCarpet,
        numberOfTracks: reception.numberOfTracks,
      }));
    }
    setVisits(lastVisits().slice(-4).reverse());
  }, [client, visits]);

  return (
    <section id="rightContainer">
      <div className="savedInformation">
        <div className="headlineInformation">
          <h2>
            ID broj klijenta: <span>{client.carpetReceptionUser}</span>
          </h2>
        </div>
        <div className="information">
          <p>Ime: </p>
          <span>{client.name}</span>
        </div>
        <div className="information">
          <p>Prezime: </p>
          <span>{client.surname}</span>
        </div>
        <div className="information">
          <p>Adresa: </p>
          <span>{client.address}</span>
        </div>
        <div className="information">
          <p>Telefon: </p>
          <span>{client.phone}</span>
        </div>
        <div className="information">
          <p>Broj tepiha:</p>
          <span>{client.numberOfCarpet}</span>
        </div>
        <div className="information">
          <p>Broj staza:</p>
          <span>{client.numberOfTracks}</span>
        </div>
      </div>
      <div className="lastVisit">
        <div className="visitHedline">
          <h3>
            Posete klijenta nasem servisu: <span>{visits.length - 1}</span>
          </h3>
        </div>
        <div className="table">
          <div className="visit">
            <div>
              <p>Datum:</p>
              <span>{!visits[0] ? "" : visits[0].date}</span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>{!visits[0] ? "" : visits[0].numberOfCarpet}</span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>{!visits[0] ? "" : visits[0].numberOfTracks}</span>
            </div>
          </div>
          <div className="visit">
            <div>
              <p>Datum:</p>
              <span>{!visits[1] ? "" : visits[1].date}</span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>{!visits[1] ? "" : visits[1].numberOfCarpet}</span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>{!visits[1] ? "" : visits[1].numberOfTracks}</span>
            </div>
          </div>
          <div className="visit">
            <div>
              <p>Datum:</p>
              <span>{!visits[2] ? "" : visits[2].date}</span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>{!visits[2] ? "" : visits[2].numberOfCarpet}</span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>{!visits[2] ? "" : visits[2].numberOfTracks}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
