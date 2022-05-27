import React, { useState } from "react";
import api from "../../../api/api";
import { useUser } from "../../../Context/UserContext";
import "./AddCostModal.css";

export default function AddCostModal() {
  const { user } = useUser() as any;

  const [cost, setCost] = useState("");

  async function addCost() {
    await api(`api/costs/addCosts/${user.userId}`, "post", { title: cost });
    setCost("");
  }

  return (
    <section id="AddCostModal">
      <h1>Dodaj Novu Vrstu Troska</h1>
      <form>
        <input
          type="text"
          placeholder="Dodaj novu vrstu troskova"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button onClick={() => addCost()}>Posalji...</button>
      </form>
    </section>
  );
}
