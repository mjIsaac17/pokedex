import React, { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";

export const PokemonListScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const totalPokemon = pokemon ? pokemon.length : 0;
  const getPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${totalPokemon}&limit=30`
    );
    if (response.ok) {
      const data = await response.json();

      Promise.all(
        data.results.map((pokemonData) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`)
        )
      )
        .then((responses) =>
          Promise.all(responses.map((res) => res.json())).then((newPokemon) =>
            setPokemon(pokemon ? [...pokemon, ...newPokemon] : newPokemon)
          )
        )
        .finally(() => setIsLoading(false));
      console.log(data);
    } else console.log(response);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  else {
    return (
      <div className="container">
        {pokemon && (
          <InfiniteScroll
            className="flex-container"
            dataLength={totalPokemon}
            next={getPokemon}
            hasMore
          >
            {pokemon.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
};
