import React from "react";
import "./style.scss";

const Button = ({ name, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
