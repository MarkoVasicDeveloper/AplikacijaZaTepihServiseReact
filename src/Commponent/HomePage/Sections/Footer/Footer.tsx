import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

export default function Footer() {
  return (
    <section id="footer">
      <div className="transparent-one"></div>
      <div className="transparent-two"></div>
      <div className="transparent-three"></div>
      <div className="footer-info">
        <h3>ostanimo u kontaktu</h3>
        <p className="call_to_action">
          Budite slobodni da nas kontaktirate po bilo kom pitanju
        </p>
        <div className="mail">
          <a href="mailto:washersoftware@gmail.com">washersoftware@gmail.com</a>
        </div>
        <div className="socialDiv">
          <a href="https://www.facebook.com/Clever-Solutions-Team-111016498048349">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="instagram.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Back To Top
        </button>
        <div className="copy">
          <p>© Copyright Washer - Developed by Clever Solution</p>
        </div>
      </div>
    </section>
  );
}
