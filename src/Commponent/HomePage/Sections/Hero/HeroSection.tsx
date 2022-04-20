import React from "react";
import "./Hero.css";

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="imageContainer">
        <div className="shadow"></div>
        <div className="shadow1"></div>
        <div className="shadow2"></div>
        <div className="shadow3"></div>
        <div className="animation">
          <h1>Poslovni Softver</h1>
          <h3>
            Unapredite poslovanje Vaseg tepih servisa uz pomoc Washer poslovnog
            sofvera!
          </h3>
          <div className="description">
            <h3>Brz | Pouzdan | Koristan</h3>
            <h3>Stedi vreme i novac!</h3>
          </div>
          <div className="hero-info">
            <h3>
              Prvi poslovni softver na ovim prostorima namenjen za savremeno i
              uspesnije vodjenje tepih servisa
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
