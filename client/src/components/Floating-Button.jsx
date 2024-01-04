import React from "react";
import "./FloatingButton.css";

export const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      +
    </button>
  );
};