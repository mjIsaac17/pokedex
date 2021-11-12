import React from "react";
import "./loadingScreen.css";

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div>
        <h1>Loading</h1>

        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
