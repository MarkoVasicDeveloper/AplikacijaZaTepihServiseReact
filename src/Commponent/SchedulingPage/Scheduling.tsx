import { useState } from "react";
import api from "../../api/api";
import { useUser } from "../../Context/UserContext";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./Scheduling.css";

export default function Scheduling() {
  const { user } = useUser() as any;

  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
    note: "",
  });

  const [savedInfo, setSavedInfo] = useState({
    savedName: "",
    savedSurname: "",
    savedAddress: "",
    savedPhone: "",
    savedEmail: "",
    savedNote: "",
  }) as any;

  async function setSchedule() {
    if (
      savedInfo.name === "" ||
      savedInfo.surname === "" ||
      savedInfo.phone === ""
    )
      return;
    const scheduleResult = await api(
      `api/schedulingCarpet/add/${user.userId}`,
      "post",
      userInfo
    );

    setUserInfo({
      name: "",
      surname: "",
      address: "",
      phone: "",
      email: "",
      note: "",
    });

    setSavedInfo({
      savedName: scheduleResult.data.name,
      savedSurname: scheduleResult.data.surname,
      savedAddress: scheduleResult.data.address,
      savedPhone: scheduleResult.data.phone,
      savedEmail: scheduleResult.data.email,
      savedNote: scheduleResult.data.note,
    });
    console.log(savedInfo);
  }

  return (
    <section id="scheduling">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <h1>Zakazivanje preuzimanja</h1>
      <div className="schedulingContent">
        <div className="leftContent">
          <h3>Obavezne informacije</h3>
          <div className="informationSheduling">
            <div className="infoInput">
              <label htmlFor="name">Ime:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </div>
            <div className="infoInput">
              <label htmlFor="surname">Prezime:</label>
              <input
                type="text"
                name="surname"
                id="surname"
                value={userInfo.surname}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, surname: e.target.value })
                }
              />
            </div>
            <div className="infoInput">
              <label htmlFor="address">Adresa:</label>
              <input
                type="text"
                name="address"
                id="address"
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
              />
            </div>
            <div className="infoInput">
              <label htmlFor="phone">Telefon:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </div>

            <h3>Ostale informacije</h3>

            <div className="infoInput">
              <label htmlFor="Email">Email:</label>
              <input
                type="text"
                name="Email"
                id="Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </div>
            <div className="infoInput">
              <label htmlFor="note">Napomena:</label>
              <textarea
                id="note"
                value={userInfo.note}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, note: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <button onClick={() => setSchedule()}>Posalji</button>
        </div>
        <div className="rightContent">
          <div className="savedInfo">
            <div className="rightInfo">
              <p>Ime:</p>
              <span>{savedInfo.savedName}</span>
            </div>
            <div className="rightInfo">
              <p>Prezime:</p>
              <span>{savedInfo.savedSurname}</span>
            </div>
            <div className="rightInfo">
              <p>Adresa:</p>
              <span>{savedInfo.savedAddress}</span>
            </div>
            <div className="rightInfo">
              <p>Telefon:</p>
              <span>{savedInfo.savedPhone}</span>
            </div>
            <div className="rightInfo">
              <p>Email:</p>
              <span>{savedInfo.savedEmail}</span>
            </div>
            <div className="rightInfo">
              <p>Napomena:</p>
              <span>{savedInfo.savedNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
