import React, { useState } from "react";
import { Layout } from "./components/Layout/Layout";
import { PokemonContext } from "./components/PokemonListScreen/PokemonContext";
export const PokedexApp = () => {
  const [pokemon, setPokemon] = useState([]);
  const [generations, setGenerations] = useState(null);
  const [pokemonContext, setPokemonContext] = useState({
    pokemon: null,
    generations: null,
    currentGeneration: null,
  });
  return (
    <PokemonContext.Provider value={{ pokemonContext, setPokemonContext }}>
      <Layout />
    </PokemonContext.Provider>
  );
};
