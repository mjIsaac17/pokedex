import React from "react";
import { useLocation } from "react-router";
import { Chip } from "../Chip/Chip";
import "./pokemonDetails.css";

export const PokemonDetails = () => {
  const { pokemon } = useLocation().state;
  console.log(pokemon);
  return (
    <div className="details__box">
      <div className="paper">
        <h1>{pokemon.name}</h1>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
        <div>
          <h2>Types:</h2>
          {pokemon.types.map((t) => (
            <Chip key={t.type.name} pokemonType={t.type.name} />
          ))}
        </div>
        <p>Base experience: {pokemon.base_experience}</p>
        <div>
          <h2>Stats:</h2>
          {pokemon.stats.map((s, index) => (
            <p key={index}>
              <b>{s.stat.name}: </b>
              {s.base_stat}
            </p>
          ))}
        </div>
        <div>
          <b>Height: </b>
          <p>{pokemon.height / 10} mt</p>
          <b>Weight: </b>
          <p>{pokemon.weight / 10} kg</p>
        </div>
        <div>
          <h2>Abilities:</h2>
          {pokemon.abilities.map((a) => (
            <p key={a.ability.name}>{a.ability.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
