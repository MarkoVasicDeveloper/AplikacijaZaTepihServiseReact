import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AdminProps } from "../../../misc/HeaderProps/props";
import "./HeaderAdmin.css";

export default function HeaderAdmin() {
  return (
    <section id="adminHeader">
      {AdminProps.map((prop) => (
        <div key={prop.id} className="expand">
          <div className="icon">
            <Link to={prop.link}>
              <FontAwesomeIcon icon={prop.icon} />
            </Link>
          </div>
          <div className="iconTitle">{prop.title}</div>
        </div>
      ))}
    </section>
  );
}
