import React, { useEffect, useState } from "react";

export const PokemonListScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (response.ok) {
      const data = await response.json();

      Promise.all(
        data.results.map((pokemon) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        )
      )
        .then((responses) =>
          Promise.all(responses.map((res) => res.json())).then((pokemon) =>
            setPokemon(pokemon)
          )
        )
        .finally(() => setIsLoading(false));
    } else console.log(response);
  };
  console.log(pokemon);

  useEffect(() => {
    getPokemon();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  else {
    return <div className="container"></div>;
  }
};
