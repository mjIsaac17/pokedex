import React, { useState } from "react";
import { Layout } from "./components/Layout/Layout";
import { PokemonContext } from "./components/PokemonContext";
export const PokedexApp = () => {
  const [pokemon, setPokemon] = useState([]);
  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon }}>
      <Layout />
    </PokemonContext.Provider>
  );
};
