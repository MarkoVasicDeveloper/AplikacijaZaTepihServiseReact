import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderHome.css";

export default function HeaderHome(props: { item: any }) {
  const [changeHeader, setChangeHeader] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", setHeader);

    return () => {
      window.removeEventListener("scroll", setHeader);
    };
  }, []);

  function setHeader() {
    const position = window.scrollY;
    if (position > 50) return setChangeHeader(true);
    setChangeHeader(false);
  }

  return (
    <div className={changeHeader ? "header-container" : "header-transparent"}>
      <div className="logo-container">
        <div className="logo">WASHER</div>
      </div>
      <div className={!showMobileNav ? "navBar" : "mobile-nav"}>
        <nav>
          {props.item.map((prop: any) => {
            return (
              <ul key={prop.id}>
                <li>
                  <Link to={prop.link}> {prop.text} </Link>
                </li>
              </ul>
            );
          })}
        </nav>
        <div className="manu">
          <button onClick={() => setShowMobileNav(!showMobileNav)}>Menu</button>
        </div>
      </div>
    </div>
  );
}
