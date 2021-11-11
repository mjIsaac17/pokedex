import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toastr from "toastr";
import "../../../node_modules/toastr/build/toastr.css";

import { Card } from "../Card/Card";
import { SkeletonCard } from "../Card/SkeletonCard";
import { InputText } from "../InputText/InputText";

import { PokemonContext } from "./PokemonContext";
import "./pokemonListScreen.css";

toastr.options = {
  closeButton: true,
  positionClass: "toast-bottom-left",
};

export const PokemonListScreen = () => {
  const history = useHistory();

  // context constants
  const { pokemonContext, setPokemonContext } = useContext(PokemonContext);
  const { pokemonList, generations, currentGeneration, totalAllPokemon } =
    pokemonContext;

  // useStates
  const [filterPokemon, setFilterPokemon] = useState("");
  const [currentTotalPokemon, setCurrentTotalPokemon] = useState(
    pokemonList.length
  );
  const [isLoading, setIsLoading] = useState(
    currentTotalPokemon === 0 ? true : false
  );
  const [hasMore, setHasMore] = useState(
    currentGeneration === -1 ? true : false //currentGeneration
  );

  // functions to get data from PokeAPI
  const getPokemonByGeneration = useCallback(
    async (generation) => {
      console.log("getPokemonByGeneration");
      const response = await fetch(
        `https://pokeapi.co/api/v2/generation/${generation}`
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentTotalPokemon(data.pokemon_species.length);
        Promise.all(
          data.pokemon_species.map((pokemonData) => {
            //Get pokemon id from url because the name is not working for all pokemon.
            //E.j. Generation 3 returns the pokemon "deoxys" as name, but to get the pokemon data is necessary
            // to request it by "deoxys-normal"
            const id = pokemonData.url.split("/")[6]; //position 6 contains the id
            return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          })
        )
          .then((responses) =>
            Promise.all(responses.map((res) => res.json())).then(
              (newPokemon) => {
                const sortedPokemon = newPokemon.sort((a, b) => a.id - b.id);
                setPokemonContext((currentPokemonContext) => ({
                  ...currentPokemonContext,
                  pokemonList: sortedPokemon,
                }));
              }
            )
          )
          .finally(() => setIsLoading(false));
      } else console.log(response);
    },
    [setPokemonContext]
  );

  const getAllPokemon = useCallback(
    async (url, clearPokemonList = false, totalAllPokemon = 0) => {
      console.log("getAllPokemon", url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        if (totalAllPokemon === 0)
          setPokemonContext((currentPokemonContext) => ({
            ...currentPokemonContext,
            totalAllPokemon: data.count,
          }));

        Promise.all(
          data.results.map((pokemonData) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`)
          )
        )
          .then((responses) =>
            Promise.all(responses.map((res) => res.json())).then(
              (newPokemon) => {
                setCurrentTotalPokemon((total) =>
                  clearPokemonList
                    ? newPokemon.length
                    : newPokemon.length + total
                );
                setPokemonContext((currentPokemonContext) => ({
                  ...currentPokemonContext,
                  pokemonList: clearPokemonList
                    ? newPokemon
                    : [...currentPokemonContext.pokemonList, ...newPokemon],
                }));
              }
            )
          )
          .finally(() => setIsLoading(false));
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
  }, [setPokemonContext]);

  // handler functions
  const handleFilter = (e) => {
    const filter = e.target.value.replace(/\\/g, "\\\\");
    setFilterPokemon(filter);
  };

  const handleSearchPokemon = async () => {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${filterPokemon.toLocaleLowerCase()}`
    );
    if (data.ok) {
      const pokemon = await data.json();
      console.log(pokemon);
      history.push(`details/${pokemon.name}`, { selectedPokemon: pokemon });
    } else toastr.error("Pokemon not found");
  };

  const handleSelectGeneration = (e) => {
    const generation = parseInt(e.target.value);
    setIsLoading(true);
    setPokemonContext((currentPokemonContext) => ({
      ...currentPokemonContext,
      currentGeneration: generation,
    }));
    if (generation !== -1) {
      setHasMore(false);
      getPokemonByGeneration(generation + 1);
    } else {
      getAllPokemon(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=30",
        true,
        totalAllPokemon
      );
      setHasMore(true);
    }
  };

  // effects
  useEffect(() => {
    if (totalAllPokemon === 0) {
      console.log("effect getPokemon");
      getGenerations();
      getAllPokemon(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=30",
        true
      );
    }
  }, [getAllPokemon, getGenerations, totalAllPokemon]);

  // skeleton when the data is loading
  let skeletonCards = [];
  for (let index = 0; index < 12; index++) {
    skeletonCards.push(<SkeletonCard key={index} />);
  }
  return (
    <div className="container">
      <div className="filter-area">
        <select
          name="ddlGeneration"
          id="ddlGeneration"
          defaultValue={currentGeneration}
          onChange={handleSelectGeneration}
        >
          <option value="-1">All</option>
          {generations.results &&
            generations.results.map(({ name }, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
        </select>

        <div className="filter-area__search">
          <InputText
            id="filter"
            name="filter"
            placeholder="Search..."
            onChangeFunction={handleFilter}
          />
          <button type="button" onClick={handleSearchPokemon}>
            Search
          </button>
        </div>
      </div>
      {!isLoading ? (
        <>
          <p>
            Total:{" "}
            {currentGeneration !== -1 ? currentTotalPokemon : totalAllPokemon}
          </p>
          <InfiniteScroll
            className="flex-container"
            dataLength={pokemonList.length}
            next={() =>
              getAllPokemon(
                `https://pokeapi.co/api/v2/pokemon?offset=${currentTotalPokemon}&limit=30`,
                false,
                totalAllPokemon
              )
            }
            hasMore={hasMore}
          >
            {pokemonList.map(
              (p) =>
                p.name.search(new RegExp(filterPokemon, "i")) !== -1 && (
                  <Card key={p.id} pokemon={p} />
                )
            )}
          </InfiniteScroll>
        </>
      ) : (
        <>
          <p>
            Total: <Skeleton width={50} />
          </p>
          <div className="flex-container">{skeletonCards}</div>
        </>
      )}
    </div>
  );
};
