import React from "react";

export const AboutScreen = () => {
  return (
    <div className="container">
      <h1>About</h1>
      <p>
        This website has been developed by using React JS, Javascript, HTML and
        CSS.
      </p>
      <p>
        The data was provided by <a href="https://pokeapi.co/">PokeAPI</a>, a
        RESTful API that includes all pokemon data in one place.
      </p>
      <br />
      <h3>NPM packages:</h3>
      <ul>
        <li>react-router-dom</li>
        <li>react-infinite-scroll</li>
        <li>react-loading-skelleton</li>
        <li>react-tooltip</li>
        <li>toastr</li>
      </ul>
      <br />

      <h3>Author</h3>
      <b>
        <p>Isaac Montes Jiménez</p>
      </b>
      <p>
        Github:{" "}
        <a href="https://github.com/mjIsaac17/" rel="noopener noreferrer">
          mjIsaac17
        </a>
      </p>
      <p>
        Linkedin:{" "}
        <a
          href="https://www.linkedin.com/in/isaac-montes-a75b85194/"
          rel="noopener noreferrer"
        >
          Isaac Montes
        </a>
      </p>
    </div>
  );
};
