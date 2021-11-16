import React, { useEffect, useState, useCallback } from "react";
import ReactTooltip from "react-tooltip";
import { useHistory, useParams } from "react-router";
import { fetchAll } from "../../helpers/fetch";
import { Chip } from "../Chip/Chip";
import "./pokemonDetails.css";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

export const PokemonDetails = () => {
  // Required pre-loaded data
  const history = useHistory();
  const urlPokemonName = useParams().pokemon;

  // states
  const [loading, setLoading] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [abilitiesDetails, setAbilitiesDetails] = useState(null);

  // functions
  const loadAbilities = async (pokemonData) => {
    const abilities = pokemonData.abilities.map((a) => a.ability.name);
    const resp = await fetchAll("ability", abilities);
    setAbilitiesDetails(resp);
  };

  const loadPokemon = useCallback(
    async (signal) => {
      try {
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${urlPokemonName.toLocaleLowerCase()}`,
          { signal }
        );
        if (data.ok) {
          const pokemonData = await data.json();
          setCurrentPokemon(pokemonData);
          await loadAbilities(pokemonData);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [urlPokemonName]
  );

  // effects
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!currentPokemon) loadPokemon(signal);

    return () => controller.abort();
  }, [loadPokemon, currentPokemon]);

  console.log(currentPokemon);
  if (loading) return <LoadingScreen />;
  else
    return (
      <div className={`details__box ${currentPokemon.types[0].type.name}`}>
        <ReactTooltip className="tooltip" effect="solid" />
        <div className="paper">
          <span className="close" onClick={history.goBack}>
            &times;
          </span>
          <div className="grid-container">
            <div className="img-area">
              <h1 className="img-area__title">
                #{currentPokemon.id}. {currentPokemon.name}
              </h1>
              <img
                src={
                  currentPokemon.sprites.other["official-artwork"].front_default
                }
                alt={currentPokemon.name}
                onClick={loadAbilities}
              />
            </div>
            <div className="stats">
              <h2>Stats:</h2>
              {currentPokemon.stats.map((s, index) => (
                <p key={index}>
                  <b>{s.stat.name}: </b>
                  {s.base_stat}
                </p>
              ))}
            </div>
            <div className="types">
              <h2>Types:</h2>
              {currentPokemon.types.map((t) => (
                <Chip key={t.type.name} pokemonType={t.type.name} />
              ))}
            </div>
            <div className="body">
              <p>
                <b>Height: </b>
                {currentPokemon.height / 10} mt
              </p>
              <p style={{ marginLeft: "1rem" }}>
                <b>Weight: </b>
                {currentPokemon.weight / 10} kg
              </p>
            </div>
            <div className="abilities">
              <h2>Abilities:</h2>
              {abilitiesDetails.map((a) => (
                <p key={a.name} data-tip={a.effect_entries[1].effect}>
                  {a.name} <span className="details__tooltip">?</span>
                </p>
              ))}
            </div>
            <p className="base-xp">
              <b>Base experience:</b> {currentPokemon.base_experience}
            </p>
          </div>
        </div>
      </div>
    );
};
