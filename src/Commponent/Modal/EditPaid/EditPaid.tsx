import { useState } from "react";
import DatePicker from "react-date-picker";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import "./EditPaid.css";

interface EditPaidInterface {
  costId: number;
  onClose: () => void;
}

export default function EditPaid({ costId, onClose }: EditPaidInterface) {
  const { user } = useUser() as any;

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [date, onChangeDate] = useState(new Date());

  const editPaidRequest = async () => {
    const a = await api(`api/cost/editCost/${costId}`, "post", {
      userId: user.userId,
      paid: paid,
      product: invoiceNumber !== "" ? invoiceNumber : null,
      price: amount !== "" ? amount : null,
      maturityData: date,
    });
    console.log(a.data);
    onClose();
  };
  return (
    <section id="EditPaid">
      <h2>Popunite samo podatke koje zelite da izmenite</h2>
      <form>
        <input
          type="text"
          placeholder="Broj fakture"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Iznos"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="date">
          <label htmlFor="deliveryDate">Valuta:</label>
          <DatePicker
            name="deliveryDate"
            value={date}
            onChange={onChangeDate}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="Placeno"
            id="paid"
            checked={paid}
            onChange={() => setPaid(!paid)}
          />
          <label htmlFor="paid">Placeno</label>
        </div>
      </form>
      <button onClick={() => editPaidRequest()}>Posalji</button>
    </section>
  );
}
