import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTrendUp,
  faRuler,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import CarpetSvg from "../../../../Img/carpet.svg";
import TrackSvg from "../../../../Img/track.svg";
import "./IconReport.css";

type AnalysisProps = {
  title: string;
  subTitle: string;
  newUser: string;
  numberOfCarpet: number;
  numberOfTracks: number;
  totalSurface: number;
  totalPrice: number;
};

export default function IconReport({
  title,
  subTitle,
  newUser,
  numberOfCarpet,
  numberOfTracks,
  totalSurface,
  totalPrice,
}: AnalysisProps) {
  return (
    <section className="iconReport">
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <div className="dailyReportContainer">
        <div className="iconReport">
          <div className="iconAndNumber">
            <div>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <div>
              <span>{newUser}</span>
            </div>
          </div>
          <div className="dailyTitle">Novi Korisnici</div>
        </div>
        <div className="iconReport">
          <div className="iconAndNumber">
            <div>
              <img src={CarpetSvg} alt="carpet icon" />
            </div>
            <div>
              <span>{numberOfCarpet}</span>
            </div>
          </div>
          <div className="dailyTitle">Tepisi</div>
        </div>
        <div className="iconReport">
          <div className="iconAndNumber">
            <div>
              <img src={TrackSvg} alt="carpet icon" />
            </div>
            <div>
              <span>{numberOfTracks}</span>
            </div>
          </div>
          <div className="dailyTitle">Staze</div>
        </div>
        <div className="iconReport">
          <div className="iconAndNumber">
            <div>
              <FontAwesomeIcon icon={faRuler} />
            </div>
            <div>
              <span>{totalSurface}</span>
            </div>
          </div>
          <div className="dailyTitle">Povrsina</div>
        </div>
        <div className="iconReport">
          <div className="iconAndNumber">
            <div>
              <FontAwesomeIcon icon={faMoneyBillTrendUp} />
            </div>
            <div>
              <span>{totalPrice}</span>
            </div>
          </div>
          <div className="dailyTitle">Promet</div>
        </div>
      </div>
    </section>
  );
}
