import React from "react";
import "./chip.css";

export const Chip = ({ pokemonType }) => {
  let classColor = "";
  switch (pokemonType) {
    case "grass":
      classColor = "grass";
      break;
    case "poison":
      classColor = "poison";
      break;
    case "fire":
      classColor = "fire";
      break;
    case "flying":
      classColor = "flying";
      break;
    case "water":
      classColor = "water";
      break;
    case "bug":
      classColor = "bug";
      break;
    case "normal":
      classColor = "normal";
      break;
    case "ground":
      classColor = "ground";
      break;
    case "electric":
      classColor = "electric";
      break;
    case "fairy":
      classColor = "fairy";
      break;
    case "fighting":
      classColor = "fighting";
      break;

    case "psychic":
      classColor = "psychic";
      break;
    case "rock":
      classColor = "rock";
      break;
    case "steel":
      classColor = "steel";
      break;
    case "ice":
      classColor = "ice";
      break;
    case "dragon":
      classColor = "dragon";
      break;
    case "dark":
      classColor = "dark";
      break;
    case "ghost":
      classColor = "ghost";
      break;
    default:
      classColor = "normal";
      break;
  }
  return <p className={`chip chip--${classColor}`}>{pokemonType}</p>;
};
