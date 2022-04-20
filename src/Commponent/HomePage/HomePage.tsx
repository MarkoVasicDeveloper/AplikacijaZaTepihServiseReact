import { HomeProps } from "../../misc/HeaderProps/props";
import HeaderHome from "../Header/HeaderHome";
import Footer from "./Sections/Footer/Footer";
import HeroSection from "./Sections/Hero/HeroSection";
import InfoSection from "./Sections/Info/InfoSection";
import InfoAboreWasher from "./Sections/InfoAboveWasher/InfoAboreWasher";
import Suport from "./Sections/Suport/Suport";

export default function HomePage() {
  return (
    <section>
      <HeaderHome item={HomeProps} />
      <HeroSection />
      <InfoSection />
      <InfoAboreWasher />
      <Suport />
      <Footer />
    </section>
  );
}
