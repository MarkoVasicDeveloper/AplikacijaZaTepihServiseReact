import {
  faCog,
  faExclamationTriangle,
  faPaste,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./Info.css";

export default function InfoSection() {
  const [position, setPosition] = useState(false);

  const infoSection = useRef() as any;

  useEffect(() => {
    window.addEventListener("scroll", loockPosition);
    return () => {
      window.removeEventListener("scroll", loockPosition);
    };
  }, []);

  function loockPosition() {
    if (infoSection.current.getBoundingClientRect().top <= 400)
      setPosition(true);
  }
  return (
    <section id="info" ref={infoSection}>
      <div className="info-container">
        <div className={position ? "show-info" : "not-show"}>
          <div className="svg-icon">
            <FontAwesomeIcon icon={faCog} />
          </div>
          <div className="title">
            <h3>Profesionalni softver za tepih servise!</h3>
          </div>
          <div className="text-description">
            <div className="paragraf">
              <p>
                Washer je namenjen tepih servisima koji zele da uvedu svoje
                poslovanje u savremene tokove. Sa Washer softverom mozete
                pratiti rast Vaseg poslovanja vrlo jednostavano, transparentno i
                pregledno.
              </p>
            </div>
            <div className="button">
              <button>Saznaj vise</button>
            </div>
          </div>
        </div>
        <div className={position ? "show-info2" : "not-show"}>
          <div className="svg-icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div className="title">
            <h3>Otklanja brojne greske u radu servisa!</h3>
          </div>
          <div className="text-description">
            <div className="paragraf">
              <p>
                Washer ce Vam pomoci da otklonite brojne greske prilikom prijema
                i isporuke tepiha.
              </p>
            </div>
            <div className="button">
              <button>Saznaj vise</button>
            </div>
          </div>
        </div>
        <div className={position ? "show-info2" : "not-show"}>
          <div className="svg-icon">
            <FontAwesomeIcon icon={faPaste} />
          </div>
          <div className="title">
            <h3>Smanjuje papiroligiju na najmanju mogucu meru!</h3>
          </div>
          <div className="text-description">
            <div className="paragraf">
              <p>
                Vasa papirologija ce biti svedena na minimum! Sve sto Vam treba
                bice na jednom mestu, na Washer serveru, 24/7 dostupno za Vas.
              </p>
            </div>
            <div className="button">
              <button>Saznaj vise</button>
            </div>
          </div>
        </div>
        <div className={position ? "show-info3" : "not-show"}>
          <div className="svg-icon">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="title">
            <h3>Olaksava prijem i isporuku tepiha!</h3>
          </div>
          <div className="text-description">
            <div className="paragraf">
              <p>
                Nisu Vam potrebni spiskovi za isporuku, niti za preuzimanje
                tepiha. Washer ce vam reci gde, sta i kod koga.
              </p>
            </div>
            <div className="button">
              <button>Saznaj vise</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
