import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="nav nav--sticky">
      <h1 className="nav__title">Pokedex</h1>
      <Link to="/" className="nav__item">
        <p>Home</p>
      </Link>
      <Link to="/about" className="nav__item">
        <p>About</p>
      </Link>
    </nav>
  );
};
