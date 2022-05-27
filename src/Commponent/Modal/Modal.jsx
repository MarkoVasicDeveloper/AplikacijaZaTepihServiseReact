import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDom from "react-dom";

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.9)",
  padding: "1rem",
};
const buttonStyle = {
  position: "fixed",
  top: "50px",
  right: "50px",
  width: "2rem",
  height: "2rem",
  fontSize: "2rem",
  color: "#fec400",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
};

export default function Modal({ children, open, onClose }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={modalStyles}>{children}</div>
      <button style={buttonStyle} onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </>,
    document.getElementById("portal")
  );
}
