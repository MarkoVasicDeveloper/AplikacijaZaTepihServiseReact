import "./InfoAboveWasher.css";

export default function InfoAboreWasher() {
  return (
    <section id="infoAboveWasher">
      <div className="what_is_washer">
        <h3>Sta je Washer?</h3>
        <div>
          <p>
            Washer <mark> nije prost program</mark> za evidenciju prijema i
            izdavanja tepiha. Mnogo vise od toga. Washer je softver koji ce Vam,
            pored evidencije izdavanja i prijema tepiha, omoguciti i pracenje
            klijenata, radnika, analizu podataka ...
          </p>
        </div>
      </div>
      <div className="taxative-information">
        <div className="one-information">
          <h4 className="one">Evidencija tepiha</h4>
          <div>
            <p>
              Da, Washer Vam hoce omoguciti i evidenciju tepiha. Bice Vam
              dostupni podaci po imenu klijenta, adresi, broju prijemnice,
              podaci o radnuku koji je primio tepihe, ko je izdao tepihe,
              napomena o klijentu, ako je stari klijent ...
            </p>
          </div>
        </div>
        <div className="one-information">
          <h4 className="two">Pracenje klijenata</h4>
          <div>
            <p>
              Dostupna Vam je evidencija o klijentima. Ime je dovoljno da znate
              da li je neko prvi put kod Vas ili je vec koristio vase usluge.
              Ako jeste imacete informacije kad i sta. Dobro je to znati. Mozda
              odlucite da pocastite staru musteriju! Dobro je privuci nove
              musterije, ali je jako bitno zadrzati stare!
            </p>
          </div>
        </div>
        <div className="one-information">
          <h4 className="three">Smanjenje papirologije</h4>
          <div>
            <p>
              Vase je da unosite podatke, a Washer ce se postarati za ostalo.
              Gde treba preuzeti tepihe, od koga, kada, pod kojim brojem. Radnik
              pred sobom ima to-do listu kako za prijem, tako i za dostavu.
              Potrebno je samo da ima tablet ili mobilni telefon.
            </p>
          </div>
        </div>
        <div className="one-information">
          <h4 className="four">Analiza podataka</h4>
          <div>
            <p>
              Svako poslovanje zahteva povremenu analizu, pa tako i poslovanje
              tepih servisa. Dostupan Vam je graficki prikaz kretanja prihoda i
              rashoda, broja primljenih tepiha, kvadratura opranih tepiha...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
