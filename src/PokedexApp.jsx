import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { PokemonListScreen } from "./components/PokemonListScreen";

export const PokedexApp = () => {
  return (
    <div>
      <Navbar />
      <PokemonListScreen />
    </div>
  );
};
