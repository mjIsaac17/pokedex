import React, { useEffect, useState, useContext, useCallback } from "react";
import { Card } from "./Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { PokemonContext } from "./PokemonContext";
import { useHistory } from "react-router";
import toastr from "toastr";
import "../../node_modules/toastr/build/toastr.css";
import { InputText } from "./InputText/InputText";

toastr.options = {
  closeButton: true,
  positionClass: "toast-bottom-left",
};

export const PokemonListScreen = () => {
  const { pokemonContext, setPokemonContext } = useContext(PokemonContext);
  const { pokemon, generations, currentGeneration = "-1" } = pokemonContext;
  const totalPokemon = pokemon ? pokemon.length : 0;
  const [isLoading, setIsLoading] = useState(totalPokemon === 0 ? true : false);
  const [filterPokemon, setFilterPokemon] = useState("");
  // const [generations, setGenerations] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const getPokemon = useCallback(
    async (url, byGeneration = false) => {
      let dataFieldName = "results",
        replaceCurrent = false;

      if (byGeneration) {
        dataFieldName = "pokemon_species";
        replaceCurrent = true;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Promise.all(
          data[dataFieldName].map((pokemonData, index) => {
            if (!byGeneration)
              return fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`
              );
            else {
              //Get pokemon id from url because the name is not working for all pokemon.
              //E.j. Generation 3 returns the pokemon "deoxys" as name, but to get the pokemon data is necessary
              // to request it by "deoxys-normal"
              const id = pokemonData.url.split("/")[6]; //position 6 contains the id
              return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
          })
        )
          .then((responses) =>
            Promise.all(responses.map((res) => res.json())).then(
              (newPokemon) => {
                if (!replaceCurrent) {
                  setPokemonContext((currentPokemonContext) => ({
                    ...currentPokemonContext,
                    pokemon: currentPokemonContext.pokemon
                      ? [...currentPokemonContext.pokemon, ...newPokemon]
                      : newPokemon,
                  }));
                } else {
                  const sortedPokemon = newPokemon.sort((a, b) => a.id - b.id);
                  setPokemonContext((currentPokemonContext) => ({
                    ...currentPokemonContext,
                    pokemon: sortedPokemon,
                  }));
                }
              }
            )
          )
          .finally(() => setIsLoading(false));
        console.log(data);
      } else console.log(response);
    },
    [setPokemonContext]
  );

  const getGenerations = useCallback(() => {
    console.log("getGens");
    fetch("https://pokeapi.co/api/v2/generation")
      .then((response) => response.json())
      .then((generationsData) =>
        setPokemonContext((currentPokemonContext) => ({
          ...currentPokemonContext,
          generations: generationsData,
        }))
      );
  }, []);

  const handleFilter = (e) => {
    const filter = e.target.value.replace(/\\/g, "\\\\");
    setFilterPokemon(filter);
  };

  const handleSearch = async () => {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${filterPokemon.toLocaleLowerCase()}`
    );
    if (data.ok) {
      const pokemon = await data.json();
      console.log(pokemon);
      history.push(`details/${pokemon.name}`, { pokemon: pokemon });
    } else toastr.error("Pokemon not found");
  };

  const handleSelectGeneration = (e) => {
    const generation = parseInt(e.target.value);
    setHasMore(false);
    setPokemonContext((currentPokemonContext) => ({
      ...currentPokemonContext,
      currentGeneration: generation,
    }));
    if (generation !== -1) {
      getPokemon(
        `https://pokeapi.co/api/v2/generation/${generation + 1}`,
        true
      );
    } else {
      setHasMore(true);
    }
  };
  console.log(generations);
  useEffect(() => {
    if (totalPokemon === 0) {
      console.log("effect getPokemon");
      getGenerations();
      getPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30");
    }
  }, [getPokemon, getGenerations]);

  if (isLoading) return <h2>Loading...</h2>;
  else {
    return (
      <div className="container">
        <div className="search-area">
          <select
            name="ddlGeneration"
            id="ddlGeneration"
            defaultValue={currentGeneration}
            onChange={handleSelectGeneration}
          >
            <option value="-1">All</option>
            {generations.results.map(({ name }, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
          <InputText
            id="filter"
            name="filter"
            placeholder="Search..."
            onChangeFunction={handleFilter}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <p>Total: {totalPokemon}</p>
        {pokemon && (
          <InfiniteScroll
            className="flex-container"
            dataLength={totalPokemon}
            next={() =>
              getPokemon(
                `https://pokeapi.co/api/v2/pokemon?offset=${totalPokemon}&limit=30`
              )
            }
            hasMore={hasMore}
          >
            {pokemon.map(
              (p) =>
                p.name.search(new RegExp(filterPokemon, "i")) !== -1 && (
                  <Card key={p.id} pokemon={p} />
                )
            )}
          </InfiniteScroll>
        )}
      </div>
    );
  }
};
