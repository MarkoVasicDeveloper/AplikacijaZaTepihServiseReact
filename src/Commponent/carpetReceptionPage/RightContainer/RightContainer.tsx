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
    setVisits(lastVisits());
    return () => {};
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
        <div className="editButton">
          <button onClick={() => console.log(visits.slice(-4)[0].date)}>
            Izmeni podatke?
          </button>
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
              <span>
                {!visits.slice(-4)[0] ? "" : visits.slice(-4)[0].date}
              </span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>
                {!visits.slice(-4)[0] ? "" : visits.slice(-4)[0].numberOfCarpet}
              </span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>
                {!visits.slice(-4)[0] ? "" : visits.slice(-4)[0].numberOfTracks}
              </span>
            </div>
          </div>
          <div className="visit">
            <div>
              <p>Datum:</p>
              <span>
                {!visits.slice(-4)[1] ? "" : visits.slice(-4)[1].date}
              </span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>
                {!visits.slice(-4)[1] ? "" : visits.slice(-4)[1].numberOfCarpet}
              </span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>
                {!visits.slice(-4)[1] ? "" : visits.slice(-4)[1].numberOfTracks}
              </span>
            </div>
          </div>
          <div className="visit">
            <div>
              <p>Datum:</p>
              <span>
                {!visits.slice(-4)[2] ? "" : visits.slice(-4)[2].date}
              </span>
            </div>
            <div>
              <p>Broj tepiha:</p>
              <span>
                {!visits.slice(-4)[2] ? "" : visits.slice(-4)[2].numberOfCarpet}
              </span>
            </div>
            <div>
              <p>Broj staza:</p>
              <span>
                {!visits.slice(-4)[2] ? "" : visits.slice(-4)[2].numberOfTracks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
