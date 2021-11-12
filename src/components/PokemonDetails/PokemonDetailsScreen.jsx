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
    setAnimate(true);
    setTimeout(() => {
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
    }, 150);
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

  const [animate, setAnimate] = useState(false);

  //Change url with current pokemon
  window.history.replaceState(
    null,
    null,
    `http://localhost:3000/details/${pokemonNavigation.currentPokemon.name}`
  );

  return (
    <div
      className={`details-container ${animate && "move--left"}`}
      onAnimationEnd={() => setAnimate(false)}
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
