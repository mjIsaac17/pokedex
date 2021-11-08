import React, { useEffect, useState, useContext, useCallback } from "react";
import { Card } from "./Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonContext } from "./PokemonContext";

export const PokemonListScreen = () => {
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const totalPokemon = pokemon ? pokemon.length : 0;
  const [isLoading, setIsLoading] = useState(totalPokemon === 0 ? true : false);

  const getPokemon = useCallback(
    async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        Promise.all(
          data.results.map((pokemonData) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`)
          )
        )
          .then((responses) =>
            Promise.all(responses.map((res) => res.json())).then((newPokemon) =>
              setPokemon((currentPokemon) =>
                currentPokemon ? [...currentPokemon, ...newPokemon] : newPokemon
              )
            )
          )
          .finally(() => setIsLoading(false));
        console.log(data);
      } else console.log(response);
    },
    [setPokemon]
  );

  useEffect(() => {
    if (totalPokemon === 0) {
      console.log("effect getPokemon");
      getPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30");
    }
  }, [getPokemon, totalPokemon]);

  if (isLoading) return <h2>Loading...</h2>;
  else {
    return (
      <div className="container">
        {pokemon && (
          <InfiniteScroll
            className="flex-container"
            dataLength={totalPokemon}
            next={() =>
              getPokemon(
                `https://pokeapi.co/api/v2/pokemon?offset=${totalPokemon}&limit=30`
              )
            }
            hasMore
          >
            {pokemon.map((p) => (
              // <div onclick={() => handleClick()}>
              // </div >
              <Card key={p.id} pokemon={p} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
};
