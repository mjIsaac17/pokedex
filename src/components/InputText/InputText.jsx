import React from "react";
import "./inputText.css";

export const InputText = ({ id, name, placeholder, onChangeFunction }) => {
  return (
    <input
      type="text"
      id={id}
      name={name}
      className="input-text"
      placeholder={placeholder}
      onChange={onChangeFunction}
    />
  );
};
