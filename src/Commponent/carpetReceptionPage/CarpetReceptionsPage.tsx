import Client from "../../Context/ClientContext";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./CarpetReceptionsPage.css";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";

export default function CarpetReceptionsPage() {
  return (
    <section id="reception">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <h1>Prijem tepiha</h1>
      <div className="centralContent">
        <Client>
          <LeftContainer />
          <RightContainer />
        </Client>
      </div>
    </section>
  );
}
