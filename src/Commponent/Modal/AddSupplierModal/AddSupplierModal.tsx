import { useState } from "react";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import "./AddSupplierModal.css";

export default function AddSupplierModal(costsId: any) {
  const { user } = useUser() as any;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pib, setPib] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  async function addSuppliers() {
    await api(
      `api/suppliers/addSuppliers/${costsId.costsId}/${user.userId}`,
      "post",
      {
        name,
        address,
        pib,
        bankAccaunt: bankAccount,
        costsId: costsId.costsId,
      }
    );
    setName("");
    setAddress("");
    setPib("");
    setBankAccount("");
  }

  return (
    <section id="AddSupplierModal">
      <h1>Dodaj Dobavljaca</h1>
      <form>
        <input
          type="text"
          placeholder="Naziv firme"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sediste"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="PIB"
          value={pib}
          onChange={(e) => setPib(e.target.value)}
        />
        <input
          type="text"
          placeholder="Broj bankovnog racuna"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
        />
      </form>
      <div>
        <button onClick={() => addSuppliers()}>Posalji</button>
      </div>
    </section>
  );
}
