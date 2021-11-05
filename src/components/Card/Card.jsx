import React from "react";
import { Chip } from "../Chip/Chip";
import "./card.css";

export const Card = ({ pokemon }) => {
  return (
    <div className="card card--light">
      <div className="card__header">
        <p className="card__header__id"> #{pokemon.id}</p>
        <p className="card__header__name">{pokemon.name}</p>
      </div>
      <div className="card__body">
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="card__footer">
        {pokemon.types.map((t, index) => (
          <Chip key={`${index}-${t.type.name}`} pokemonType={t.type.name} />
        ))}
      </div>
    </div>
  );
};
