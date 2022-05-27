import HeaderAdmin from "../Header/HeaderAdmin";
import { useUser } from "../../../Context/UserContext";
import "./Costs.css";
import api from "../../../api/api";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Modal/Modal";
import AddCostModal from "../../Modal/AddCostModal/AddCostModal";
import AddSupplierModal from "../../Modal/AddSupplierModal/AddSupplierModal";
import CostStructure from "../CostStructure/CostStructure";
import React from "react";

export default function Costs() {
  const { user } = useUser() as any;

  const [suppliers, setSuppliers] = useState("") as any;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSupplier, setIsOpenSupplier] = useState(false);
  const [supplierTitle, setSupplierTitle] = useState("");
  const [costs, setCosts] = useState("") as any;
  const [costId, setCostId] = useState(0);
  const [show, setShow] = useState(false);
  const [costTitle, setCostTitle] = useState("");
  const [costStructure, setCostStructure] = useState(false);
  const [supplierId, setSupplierId] = useState(0);

  useEffect(() => {
    (async () => {
      const costsData = await api(
        `api/costs/getAllCosts/${user.userId}`,
        "get",
        {}
      );
      setCosts(costsData.data);
      setSupplierTitle("");
    })();
  }, [isOpen]);

  useEffect(() => {
    getSuppliers(costId);
  }, [isOpenSupplier]);

  async function getSuppliers(costsId: number) {
    const suppliers = await api(
      `api/suppliers/getAllSuppliers/${costsId}/${user.userId}`,
      "get",
      {}
    );
    setSuppliers(suppliers.data);
    setCostId(costsId);
  }

  return (
    <section id="administratorCosts">
      <HeaderAdmin />
      <h1>Evidencija troskova poslovanja</h1>
      <div className="containerCosts">
        <button onClick={() => setIsOpen(true)}>Dodaj trosak</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <AddCostModal />
        </Modal>
        <div className="dataCosts">
          <div className="firm">
            <div>
              <h2>Vrste troskova</h2>
              {costs
                ? costs.map((cost: any) => (
                    <div
                      key={cost.costsId}
                      className="tipsCosts"
                      onClick={() => {
                        getSuppliers(cost.costsId);
                        setShow(true);
                        setCostTitle(cost.title);
                        setSupplierTitle("");
                        setCostStructure(false);
                      }}
                    >
                      <h3>{cost.title}</h3>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="costsInfo">
            {costTitle ? <h3>{costTitle}</h3> : ""}
            <div className="displayFirms">
              {suppliers
                ? suppliers.map((supplier: any) => (
                    <div
                      key={supplier.suppliersId}
                      className="firmDiv"
                      onClick={() => {
                        setCostStructure(true);
                        setSupplierId(supplier.suppliersId);
                        setSupplierTitle(supplier.name);
                      }}
                    >
                      <div>
                        <span>{supplier.name}</span>
                      </div>
                      <div>{supplier.address}</div>
                      <div>{supplier.bankAccount}</div>
                      <div>{supplier.pib}</div>
                    </div>
                  ))
                : ""}
            </div>
            {show ? (
              <button onClick={() => setIsOpenSupplier(true)}>
                Dodaj dobavljaca
              </button>
            ) : (
              ""
            )}
            {costStructure ? (
              <CostStructure
                supplierId={supplierId}
                costsId={costId}
                title={supplierTitle}
              />
            ) : (
              ""
            )}
            <Modal
              open={isOpenSupplier}
              onClose={() => setIsOpenSupplier(false)}
            >
              <AddSupplierModal costsId={costId} />
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
}
