import { useEffect, useReducer, useRef, useState } from "react";
import { useReceptionInfo } from "../../../Context/ReceptionInfoContext";
import { useUser } from "../../../Context/UserContext";
import { useWorker } from "../../../Context/WorkerContext";
import {
  addCarpet,
  editCarpetRequest,
  editReception,
  emptyInput,
} from "../../../misc/Function/MeasuringAndPreparingCarpet/RightContentFunction";
import {
  DimensionsReducer,
  initialDimensions,
} from "../../../Reducers/MeasuringAndPreparingCarpet/DimensionsReducer";
import "./RightContentMeasuring.css";

export default function RightContentMeasuring() {
  const [state, dispatch] = useReducer(DimensionsReducer, initialDimensions);
  const { reception, setReceptionEvent } = useReceptionInfo() as any;
  const { user } = useUser() as any;
  const { worker } = useWorker() as any;

  const inputWidth = useRef([]) as any;
  const inputHeight = useRef([]) as any;
  const inputPrice = useRef([]) as any;

  const [surface, setSurface] = useState({}) as any;
  const [forPay, setForPay] = useState({}) as any;

  const [disabled, setDisabled] = useState({}) as any;

  useEffect(() => {
    setSurface({});
    setForPay({});
    setDisabled({});
    if (inputWidth && inputHeight && inputPrice)
      [...inputWidth.current, ...inputHeight.current, ...inputPrice.current]
        .filter((input: any) => input)
        .forEach((input: { value: string }) => (input.value = ""));
  }, [reception.carpetReceptionUserId]);

  async function sendCarpetData(key: string, index: number) {
    if (!emptyInput(state[key])) return;

    setSurface({ ...surface, [key]: state[key].width * state[key].height });
    setForPay({
      ...forPay,
      [key]: state[key].width * state[key].height * state[key].price,
    });
    setDisabled({ ...disabled, [key]: true });

    const carpetResponse = await addCarpet(user, state, reception, key, worker);
    setReceptionEvent({
      ...reception,
      forPay: reception.forPay + carpetResponse.data.forPayment,
      carpetId: {
        ...reception["carpetId"],
        [key]: carpetResponse.data.carpetId,
      },
    });
    await editReception(reception, user, index);
  }

  async function editCarpet(key: string) {
    if (!emptyInput(state[key])) return;
    const editResponse = await editCarpetRequest(reception, key, worker, user);

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
    setReceptionEvent({
      ...reception,
      forPay: reception.forPay + editResponse.data.forPayment - forPay[key],
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
                    ref={(input) => (inputWidth.current[index] = input)}
                    type="number"
                    name={`Tepih/Staza ${index}`}
                    id="width"
                    onChange={(e) => {
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : dispatch({
                            type: "setDimensions",
                            name: e.target.name,
                            field: "width",
                            value: e.target.value,
                          });
                    }}
                  />
                </div>
                <div className="dimension">
                  <label htmlFor="height">Duzina:</label>
                  <input
                    ref={(input) => (inputHeight.current[index] = input)}
                    type="number"
                    name={`Tepih/Staza ${index}`}
                    id="height"
                    onChange={(e) =>
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : dispatch({
                            type: "setDimensions",
                            name: e.target.name,
                            field: "height",
                            value: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="dimension">
                  <label htmlFor="price">Cena:</label>
                  <input
                    ref={(input) => (inputPrice.current[index] = input)}
                    type="number"
                    name={`Tepih/Staza ${index}`}
                    id="price"
                    onChange={(e) =>
                      Number(e.target.value) < 0
                        ? (e.target.value = "")
                        : dispatch({
                            type: "setDimensions",
                            name: e.target.name,
                            field: "price",
                            value: e.target.value,
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
