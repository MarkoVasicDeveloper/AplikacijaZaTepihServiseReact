import { HomeProps } from "../../misc/HeaderProps/props";
import HeaderHome from "../Header/HeaderHome";
import "./LetsStart.css";
import singUp from "../../Img/mini_SingUp.png";
import logIn from "../../Img/mini_Login.png";
import receptionCarpet from "../../Img/mini_CarpetReception.png";
import measuringAndPreparing from "../../Img/mini_MeasuringAndPreparingCarpet.png";
import deliveryList from "../../Img/mini_DeliveringList.png";
import schedulingCarpet from "../../Img/mini_Scheduling.png";
import downloadList from "../../Img/mini_DownloadList.png";
import analysis from "../../Img/mini_Analysis.png";

export default function LetsStart() {
  return (
    <section className="hero-letsStart">
      <HeaderHome item={HomeProps} />
      <div className="letsStart-holder">
        <div className="step-one">
          <div className="step-one-info">
            <h2>
              {" "}
              <span>1.</span>Registrovanje{" "}
            </h2>
            <p>
              Prvi korak jeste registracija. Sva polja moraju biti popunjena. Po
              zavrsenoj registraciji dobijate poruku na email adresu koju ste
              naveli.
            </p>
          </div>
          <div>
            <img src={singUp} alt="Sing in button" />
          </div>
        </div>

        <div className="step-two">
          <div className="step-two-info">
            <h2>
              {" "}
              <span>2. </span>Logovanje{" "}
            </h2>
            <p>
              U poruci koja vam je stigla na email, nalazi se link. On vas vodi
              na stranicu za logovanje. Kada popunite podatke za logovanje,
              moracete da kreirate radnika.
            </p>
          </div>
          <div>
            <img src={logIn} alt="Log in page" />
          </div>
        </div>

        <div className="explanation">
          <div className="explanation-welcome">
            <h2> Dobro dosli u Washer softver</h2>
            <p>Sada kada ste prijavljeni da vam pojasnimo interfejs</p>
          </div>
          <div className="explanation-reception">
            <div className="explanation-info">
              <h2>
                <span>1.</span>Prijem tepiha
              </h2>
              <p>
                Na levoj strani se popunjavaju podaci o klijentu. Tepisi i staze
                se pisu u komadima, Na strani za pripremu se popunjavaju
                dimenzije za svaki tepih. Kada kliknete na posalji popunice Vam
                se desna strana. Najvazniji podatak je{" "}
                <span>ID broj klijenta</span>. To je broj kojim obelezavate
                tepihe. U donjem desnom uglu se nalaze podaci o posetama
                klijenta Vasem servisu.
              </p>
            </div>
            <div className="explanation-reception-img">
              <img src={receptionCarpet} alt="prijem tepiha" />
            </div>
          </div>

          <div className="explanation-measuringandpreparingcarpet">
            <div className="explanation-measuring-info">
              <h2>
                <span>2.</span>Priprema tepiha
              </h2>
              <p>
                Na ovoj strani je potrebno da unesete ID broj kojim su obelezeni
                tepisi. Klikom na posalji popunice Vam se podaci na levoj
                strani. Bitno je da izaberete
                <span>datum isporuke tepiha</span>, kako bi softver znao kada je
                isporuka. Na desnoj strani su Vam se pojavila polja za unos
                dimenzija tepiha. Popunjavanjem dimenzija i njihovim slanjem, na
                levoj strani ce vam biti izracunata suma za naplatu.
              </p>
            </div>
            <div className="explanation-measuring-img">
              <img
                src={measuringAndPreparing}
                alt="Merenje i priprema tepiha"
              />
            </div>
          </div>

          <div className="explanation-delivery-list">
            <div className="explanation-delivery-list-info">
              <h2>
                <span>3.</span>Lista za isporuku
              </h2>
              <p>
                Na ovoj strani ce vam biti izlistani svi klijenti kod kojih
                imate isporuku za ovaj dan. Zato je bitno da prilikom pripreme
                tepiha navedete datum isporuke. Ukoliko ne mozete da nadjete
                klijenta, imate dugme koje ce vam prikazati mapu. Kada zavrsite
                izporuku kliknite na dugme
                <span>isporuka savrsena</span>.
              </p>
            </div>
            <div className="explanation-delivery-list-img">
              <img src={deliveryList} alt="Isporuka tepiha" />
            </div>
          </div>

          <div className="explanation-scheduling-carpet">
            <div className="explanation-scheduling-carpet-info">
              <h2>
                <span>4.</span>Zakazivanje preuzimanja
              </h2>
              <p>
                Ovde mozete unositi podatke o klijentima koji zakazuju
                preuzimanje tepiha.
              </p>
            </div>
            <div className="explanation-scheduling-carpet-img">
              <img src={schedulingCarpet} alt="Zakazivanje isporuke" />
            </div>
          </div>

          <div className="explanation-download-list">
            <div className="explanation-download-list-info">
              <h2>
                <span>5.</span>Lista preuzimanja
              </h2>
              <p>
                Sva zakazana preuzimanja ce biti prikazana. Takodje imate opciju
                pomoci ukoliko ne mozete da nadjete klijenta. Kada zavrsite
                preuzimanje kliknite na <span>preuzimanje zavrseno</span>.
              </p>
            </div>
            <div className="explanation-download-list-img">
              <img src={downloadList} alt="Lista za isporuku" />
            </div>
          </div>

          <div className="explanation-analysis">
            <div className="explanation-analysis-info">
              <h2>
                <span>6.</span>Analiza podataka
              </h2>
              <p>
                Dostupni su vam podaci o broji novih klijenata, broju tepiha i
                staza, povrsini, ostvarenom prometu na dnevnom, sedmicnom,
                mesecnom i godisnjem nivou.
              </p>
            </div>
            <div className="explanation-analysis-img">
              <img src={analysis} alt="Analiza poslovanja" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
