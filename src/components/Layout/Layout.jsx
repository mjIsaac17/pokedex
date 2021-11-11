import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";

import { PokemonDetails } from "../PokemonDetails/PokemonDetails";
import { PokemonDetailsScreen } from "../PokemonDetails/PokemonDetailsScreen";
import { PokemonListScreen } from "../PokemonListScreen/PokemonListScreen";
import { PokemonContext } from "../PokemonListScreen/PokemonContext";

export const Layout = () => {
  const { pokemonContext } = useContext(PokemonContext);
  return (
    <Router>
      <Navbar />
      <div style={{ height: "92%" }}>
        <Switch>
          {pokemonContext.pokemonList.length > 0 ? (
            <Route
              exact
              path="/details/:pokemon"
              component={PokemonDetailsScreen}
            />
          ) : (
            <Route exact path="/details/:pokemon" component={PokemonDetails} />
          )}
          <Route path="/pokemon" component={PokemonListScreen} />
          <Redirect to="/pokemon" />
        </Switch>
      </div>
    </Router>
  );
};
