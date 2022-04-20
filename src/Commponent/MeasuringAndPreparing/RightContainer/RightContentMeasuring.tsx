import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useReceptionInfo } from "../../../Context/ReceptionInfoContext";
import { useUser } from "../../../Context/UserContext";
import { useWorker } from "../../../Context/WorkerContext";
import "./RightContentMeasuring.css";

export default function RightContentMeasuring() {
  const { reception, setReceptionEvent } = useReceptionInfo() as any;
  const { user } = useUser() as any;
  const { worker } = useWorker() as any;

  const [surface, setSurface] = useState({}) as any;
  const [forPay, setForPay] = useState({}) as any;

  const [disabled, setDisabled] = useState({}) as any;

  useEffect(() => {
    setSurface({});
    setForPay({});
    setDisabled({});
  }, [reception.carpetReceptionUserId]);

  function sendCarpetData(key: string, index: number) {
    if (
      reception.dimensions[key].width === "" ||
      reception.dimensions[key].height === "" ||
      reception.dimensions[key].price === ""
    )
      return;
    setSurface({
      ...surface,
      [key]: reception.dimensions[key].width * reception.dimensions[key].height,
    });
    setForPay({
      ...forPay,
      [key]:
        reception.dimensions[key].width *
        reception.dimensions[key].height *
        reception.dimensions[key].price,
    });
    setDisabled({ ...disabled, [key]: true });
    api(`api/carpet/addCarpet/${user.userId}`, "post", {
      carpetReception: reception.carpetReceptionUserId,
      width: reception.dimensions[key].width,
      height: reception.dimensions[key].height,
      price: reception.dimensions[key].price,
      workerId: worker.workerId,
      deliveryDate: reception.date,
      clientsId: reception.clientId,
    }).then((res) => {
      setReceptionEvent({
        ...reception,
        forPay: reception.forPay + res.data.forPayment,
        carpetId: { ...reception["carpetId"], [key]: res.data.carpetId },
      });

      api(
        `api/carpetReception/editReception/${reception.workerReceivedId}/${user.userId}`,
        "post",
        {
          carpetReceptionId: reception.carpetReceptionUserId,
          prepare: reception.prepared + index,
        },
        "user"
      );
    });
  }

  function editCarpet(key: string) {
    if (
      reception.dimensions[key].width === "" ||
      reception.dimensions[key].height === "" ||
      reception.dimensions[key].price === ""
    )
      return;
    api(
      `api/carpet/editCarpet/${reception["carpetId"][key]}/${user.userId}`,
      "post",
      {
        carpetReception: reception.receptionId,
        width: reception.dimensions[key].width,
        height: reception.dimensions[key].height,
        price: reception.dimensions[key].price,
        workerId: worker.workerId,
        deliveryDate: reception.date,
        clientsId: reception.clientId,
      }
    ).then((res) => {
      setSurface({
        ...surface,
        [key]:
          reception.dimensions[key].width * reception.dimensions[key].height,
      });
      setForPay({
        ...forPay,
        [key]:
          reception.dimensions[key].width *
          reception.dimensions[key].height *
          reception.dimensions[key].price,
      });
      setReceptionEvent({
        ...reception,
        forPay: reception.forPay + res.data.forPayment - forPay[key],
      });
    });
  }

  return (
    <section id="rightContentMeasuring">
      {reception.show > 0
        ? new Array(reception.show).fill(0).map((_: any, index: number) => {
            return (
              <div key={index} className="carpetDiv">
                <h2>Tepih/Staza {index + 1}</h2>
                <div className="dimension">
                  <label htmlFor="width">Sirina:</label>
                  <input
                    type="number"
                    min={0}
                    name={`Tepih/Staza ${index}`}
                    id="width"
                    value={
                      !reception.dimensions
                        ? ""
                        : reception.dimensions[`Tepih/Staza ${index}`].width
                    }
                    onChange={(e) => {
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : setReceptionEvent({
                            ...reception,
                            dimensions: {
                              ...reception.dimensions,
                              [e.target.name]: {
                                ...reception.dimensions[e.target.name],
                                width: e.target.value,
                              },
                            },
                          });
                    }}
                  />
                </div>
                <div className="dimension">
                  <label htmlFor="height">Duzina:</label>
                  <input
                    type="number"
                    min={0}
                    name={`Tepih/Staza ${index}`}
                    id="height"
                    value={
                      !reception.dimensions
                        ? ""
                        : reception.dimensions[`Tepih/Staza ${index}`].height
                    }
                    onChange={(e) =>
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : setReceptionEvent({
                            ...reception,
                            dimensions: {
                              ...reception.dimensions,
                              [e.target.name]: {
                                ...reception.dimensions[e.target.name],
                                height: e.target.value,
                              },
                            },
                          })
                    }
                  />
                </div>
                <div className="dimension">
                  <label htmlFor="price">Cena:</label>
                  <input
                    type="number"
                    min={0}
                    name={`Tepih/Staza ${index}`}
                    id="price"
                    value={
                      !reception.dimensions
                        ? ""
                        : reception.dimensions[`Tepih/Staza ${index}`].price
                    }
                    onChange={(e) =>
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : setReceptionEvent({
                            ...reception,
                            dimensions: {
                              ...reception.dimensions,
                              [e.target.name]: {
                                ...reception.dimensions[e.target.name],
                                price: e.target.value,
                              },
                            },
                          })
                    }
                  />
                </div>
                <div className="carpetButton">
                  <button
                    disabled={disabled[`Tepih/Staza ${index}`]}
                    onClick={() =>
                      sendCarpetData(`Tepih/Staza ${index}`, index + 1)
                    }
                  >
                    Posalji
                  </button>
                  <button onClick={() => editCarpet(`Tepih/Staza ${index}`)}>
                    Edit
                  </button>
                </div>
                <div className="finallyInfo">
                  <p>
                    Povrsina: &nbsp;
                    <span>
                      {surface[`Tepih/Staza ${index}`]
                        ? surface[`Tepih/Staza ${index}`] + " m2"
                        : " m2"}
                    </span>
                  </p>
                  <p>
                    Za naplatu: &nbsp;
                    <span>
                      {forPay[`Tepih/Staza ${index}`]
                        ? forPay[`Tepih/Staza ${index}`] + " din"
                        : " din"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        : ""}
    </section>
  );
}
