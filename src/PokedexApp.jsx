import React, { useState } from "react";
import { Layout } from "./components/Layout/Layout";
import { PokemonContext } from "./components/PokemonListScreen/PokemonContext";
export const PokedexApp = () => {
  const [pokemonContext, setPokemonContext] = useState({
    pokemonList: [],
    generations: [],
    currentGeneration: -1,
    totalAllPokemon: 0,
  });
  return (
    <PokemonContext.Provider value={{ pokemonContext, setPokemonContext }}>
      <Layout />
    </PokemonContext.Provider>
  );
};
