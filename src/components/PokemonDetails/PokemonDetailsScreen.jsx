import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { PokemonContext } from "../PokemonListScreen/PokemonContext";
import { PokemonDetailsNavigation } from "./PokemonDetailsNavigation";

export const PokemonDetailsScreen = () => {
  console.log("render POkemonDetailsScreen");
  // Required pre-loaded data
  const selectedPokemon = useLocation().state.selectedPokemon;
  const { pokemonContext } = useContext(PokemonContext);

  // Constants / variables
  const pokemonList = pokemonContext.pokemonList;
  const lastPokemonIndex = pokemonList.length - 1;

  // useStates
  const [currentIndex, setCurrentIndex] = useState(
    pokemonList.findIndex((p) => p.id === selectedPokemon.id)
  );

  const [pokemonNavigation, setPokemonNavigation] = useState({
    currentPokemon: selectedPokemon,
    previousPokemon:
      pokemonList[currentIndex - 1] || pokemonList[lastPokemonIndex],
    nextPokemon: pokemonList[currentIndex + 1] || pokemonList[0],
  });

  // handler functions
  const handleSetNextPokemon = () => {
    let newPokemonIndex = currentIndex + 2;
    let newCurrentIndex = currentIndex + 1;

    if (!pokemonList[newPokemonIndex]) {
      if (currentIndex === lastPokemonIndex) {
        newPokemonIndex = 1;
        newCurrentIndex = 0;
      } else {
        newPokemonIndex = 0;
        newCurrentIndex = lastPokemonIndex;
      }
    }
    setCurrentIndex(newCurrentIndex);
    setPokemonNavigation({
      previousPokemon: pokemonNavigation.currentPokemon,
      currentPokemon: pokemonNavigation.nextPokemon,
      nextPokemon: pokemonList[newPokemonIndex],
    });
  };

  const handleSetPreviousPokemon = () => {
    let newPokemonIndex = currentIndex - 2;
    let newCurrentIndex = currentIndex - 1;

    if (!pokemonList[newPokemonIndex]) {
      if (currentIndex === 1) {
        newPokemonIndex = lastPokemonIndex;
        newCurrentIndex = 0;
      } else {
        newPokemonIndex = lastPokemonIndex - 1;
        newCurrentIndex = lastPokemonIndex;
      }
    }
    setCurrentIndex(newCurrentIndex);
    setPokemonNavigation({
      previousPokemon: pokemonList[newPokemonIndex],
      currentPokemon: pokemonNavigation.previousPokemon,
      nextPokemon: pokemonNavigation.currentPokemon,
    });
  };

  //Change url with current pokemon
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  urlParts[-1] = pokemonNavigation.currentPokemon.name;
  const newUrl = urlParts.join("/");
  window.history.replaceState(null, null, newUrl);

  return (
    <div
      className={`details-container ${pokemonNavigation.currentPokemon.types[0].type.name}`}
    >
      <div className="previous">
        <PokemonDetailsNavigation pokemon={pokemonNavigation.previousPokemon} />
      </div>

      <div className="next">
        <PokemonDetailsNavigation pokemon={pokemonNavigation.nextPokemon} />
      </div>

      <div className="current">
        <PokemonDetailsNavigation
          pokemon={pokemonNavigation.currentPokemon}
          handleClickPrevious={handleSetPreviousPokemon}
          handleClickNext={handleSetNextPokemon}
        />
      </div>
    </div>
  );
};
