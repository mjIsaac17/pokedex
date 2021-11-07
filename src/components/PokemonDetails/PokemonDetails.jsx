import React from "react";
import { useLocation, useHistory } from "react-router";
import { Chip } from "../Chip/Chip";
import "./pokemonDetails.css";

export const PokemonDetails = () => {
  const { pokemon } = useLocation().state;
  const history = useHistory();
  console.log(pokemon);
  return (
    <div className="details__box">
      <div className="paper">
        <span className="close" onClick={history.goBack}>
          &times;
        </span>
        <div className="grid-container">
          <div className="img-area">
            <h1 className="img-area__title">{pokemon.name}</h1>
            <img
              src={pokemon.sprites.other.dream_world.front_default}
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
            {pokemon.abilities.map((a) => (
              <p key={a.ability.name}>{a.ability.name}</p>
            ))}
          </div>
          <p className="base-xp">
            <b>Base experience:</b> {pokemon.base_experience}
          </p>
        </div>
      </div>
    </div>
  );
};