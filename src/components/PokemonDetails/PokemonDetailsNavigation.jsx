import React, { useCallback, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router";
import { fetchAll } from "../../helpers/fetch";
import { Chip } from "../Chip/Chip";
import "./pokemonDetails.css";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

export const PokemonDetailsNavigation = ({
  pokemon,
  handleClickPrevious,
  handleClickNext,
}) => {
  console.log("render PokemonDetailsNavigation");
  const history = useHistory();

  // states
  const [abilitiesDetails, setAbilitiesDetails] = useState(null);

  // functions
  const loadAbilities = useCallback(async (pokemonData) => {
    const abilities = pokemonData.abilities.map((a) => a.ability.name);
    const resp = await fetchAll("ability", abilities);
    setAbilitiesDetails(resp);
  }, []);

  // effects
  useEffect(() => {
    loadAbilities(pokemon);
  }, [loadAbilities, pokemon]);

  if (pokemon)
    return (
      <div className="details__box">
        <div className={`paper`}>
          <span className="close" onClick={history.goBack}>
            &times;
          </span>
          {handleClickNext && (
            <>
              <button
                className="btn-navigation btn-navigation--previous"
                onClick={handleClickPrevious}
              >
                {"<"}
              </button>
              <button
                className="btn-navigation btn-navigation--next"
                onClick={handleClickNext}
              >
                {">"}
              </button>
            </>
          )}
          <div className="grid-container">
            <div className="img-area">
              <h1 className="img-area__title">
                #{pokemon.id}. {pokemon.name}
              </h1>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </div>
            <div className="stats">
              <h2>Stats:</h2>
              {pokemon.stats.map((s, index) => (
                <p key={index}>
                  <b>{s.stat.name}: </b>
                  {s.base_stat}
                </p>
              ))}
            </div>
            <div className="types">
              <h2>Types:</h2>
              {pokemon.types.map((t) => (
                <Chip key={t.type.name} pokemonType={t.type.name} />
              ))}
            </div>
            <div className="body">
              <p>
                <b>Height: </b>
                {pokemon.height / 10} mt
              </p>
              <p style={{ marginLeft: "1rem" }}>
                <b>Weight: </b>
                {pokemon.weight / 10} kg
              </p>
            </div>
            <div className="abilities">
              <h2>Abilities:</h2>
              {abilitiesDetails &&
                abilitiesDetails.map((a) => (
                  <div key={`${pokemon.name}--${a.name}`}>
                    <ReactTooltip className="tooltip" effect="solid" />
                    <p data-tip={a.effect_entries[1].effect}>
                      {a.name} <span className="details__tooltip">?</span>
                    </p>
                  </div>
                ))}
            </div>
            <p className="base-xp">
              <b>Base experience:</b> {pokemon.base_experience}
            </p>
          </div>
        </div>
      </div>
    );
  else return <LoadingScreen />;
};
