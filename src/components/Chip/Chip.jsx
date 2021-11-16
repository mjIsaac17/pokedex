import React from "react";
import "./chip.css";

export const Chip = ({ pokemonType }) => {
  return <p className={`chip chip--${pokemonType}`}>{pokemonType}</p>;
};
