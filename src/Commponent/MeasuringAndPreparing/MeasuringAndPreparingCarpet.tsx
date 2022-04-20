import ReceptionInfo from "../../Context/ReceptionInfoContext";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import LeftContentMeasuring from "./LeftContainer/LeftContentMeasuring";
import "./MeasuringAndPreparingCarpet.css";
import RightContentMeasuring from "./RightContainer/RightContentMeasuring";

export default function MeasuringAndPreparingCarpet() {
  return (
    <section id="measuringAndPreparingCarpet">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <h1>Priprema tepiha za isporuku</h1>
      <div className="centralContentMeasuring">
        <ReceptionInfo>
          <LeftContentMeasuring />
          <RightContentMeasuring />
        </ReceptionInfo>
      </div>
    </section>
  );
}
