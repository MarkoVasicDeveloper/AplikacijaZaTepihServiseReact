import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import AddInvoice from "../../Modal/AddInvoice/AddInvoice";
import EditPaid from "../../Modal/EditPaid/EditPaid";
import Modal from "../../Modal/Modal";
import "./CostStructure.css";

interface Props {
  supplierId: number;
  costsId: number;
  title: string;
}

export default function CostStructure({ supplierId, costsId, title }: Props) {
  const { user } = useUser() as any;

  const [isOpen, setIsOpen] = useState(false);
  const [editPaid, setEditPaid] = useState(false);
  const [costId, setCostId] = useState(0);
  const [allCosts, setAllCosts] = useState([]) as any;
  const [sum, setSum] = useState("");

  useEffect(() => {
    (async () => {
      const allCosts = await api(
        `api/cost/getAllCostsBySupplier/${costsId}/${supplierId}/${user.userId}`,
        "get",
        {}
      );
      setSum(
        allCosts.data.length !== 0
          ? allCosts.data.reduce((prev: any, curr: any) => prev + curr.price, 0)
          : ""
      );
      setAllCosts(allCosts.data);
    })();
  }, [costsId, user.userId, supplierId, isOpen]);

  const setPaid = (paid: any, costId: number) => {
    setEditPaid(true);
    setCostId(costId);
  };

  return (
    <div id="costStructure">
      <h3>{title}</h3>
      <table>
        {allCosts.length !== 0 ? (
          <thead>
            <tr>
              <th>#</th>
              <th>Broj fakture</th>
              <th>Valuta</th>
              <th>Iznos</th>
            </tr>
          </thead>
        ) : (
          ""
        )}

        <tbody>
          {allCosts.map((cost: any, index: number) => {
            const date = new Date().getTime();
            const maturity = Date.parse(cost.maturityData);
            const weekInMiliseconds = 604800000;
            const cssClass =
              date > maturity
                ? "alert"
                : date > maturity - weekInMiliseconds
                ? "danger"
                : "";

            const message =
              cssClass === "alert"
                ? `Valuta istekla pre ${(
                    (date - maturity) /
                    1000 /
                    60 /
                    60 /
                    24
                  ).toFixed(0)} dana`
                : `Placanje dospeva za ${(
                    (maturity - date) /
                    1000 /
                    60 /
                    60 /
                    24
                  ).toFixed(0)} dana`;
            return (
              <tr
                key={cost.costId}
                className={cost.paid ? "success" : cssClass}
                data-text={message}
                onClick={() => setPaid(cost.paid, cost.costId)}
              >
                <td>{index + 1}</td>
                <td>{cost.product}</td>
                <td>{cost.maturityData.split("T")[0]}</td>
                <td>{cost.price}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{sum}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setIsOpen(true)}>Dodaj fakturu</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <AddInvoice supplierId={supplierId} costsId={costsId} />
      </Modal>
      <Modal open={editPaid} onClose={() => setEditPaid(false)}>
        <EditPaid costId={costId} onClose={() => setEditPaid(false)} />
      </Modal>
    </div>
  );
}
