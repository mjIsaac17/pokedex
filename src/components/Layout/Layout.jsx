import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

import { PokemonDetails } from "../PokemonDetails/PokemonDetails";
import { PokemonListScreen } from "../PokemonListScreen/PokemonListScreen";

export const Layout = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ height: "92%" }}>
        <Switch>
          <Route exact path="/details/:pokemon" component={PokemonDetails} />
          <Route path="/pokemon" component={PokemonListScreen} />
          <Redirect to="/pokemon" />
        </Switch>
      </div>
    </Router>
  );
};
