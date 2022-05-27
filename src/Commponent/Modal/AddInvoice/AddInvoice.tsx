import { useState } from "react";
import DatePicker from "react-date-picker";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import "./AddIncoice.css";

interface Props {
  supplierId: number;
  costsId: number;
}

export default function AddInvoice({ supplierId, costsId }: Props) {
  const { user } = useUser() as any;

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [date, onChangeDate] = useState(new Date());

  async function addInvoice() {
    await api(`api/cost/addCost/${user.userId}`, "post", {
      costsId: costsId,
      suppliersId: supplierId,
      product: invoiceNumber,
      quantity: 0,
      price: amount,
      paid: paid,
      maturityData: date,
    });
    setInvoiceNumber("");
    setAmount("");
    setPaid(false);
  }

  return (
    <section id="AddIncoice">
      <h1>Dodaj fakturu</h1>
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
      <div>
        <button onClick={() => addInvoice()}>Posalji...</button>
      </div>
    </section>
  );
}
