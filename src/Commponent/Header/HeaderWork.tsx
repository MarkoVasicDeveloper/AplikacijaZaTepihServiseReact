import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "./HeaderWork.css";

export default function HeaderWork(props: { item: any }) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { user } = useUser() as any;

  const navigation = useNavigate();

  useEffect(() => {
    if (!user.userLogIn) return navigation("/login");
  }, []);

  return (
    <div className={!showMobileNav ? "holder" : "mobile-nav"}>
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
  );
}
