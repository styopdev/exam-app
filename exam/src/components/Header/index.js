import React from "react";
import "./style.scss";
import Animation from "../Animation/index";

const Header = () => {
   
  return (
    <div className="header">
      <div className="animation-container">
        <Animation />
      </div>
      <h1>EXAM</h1>
    </div>
  );
};

export default Header;
