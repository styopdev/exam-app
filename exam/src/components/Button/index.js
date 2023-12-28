import React from "react";
import "./style.scss";

const Button = ({ name, onClick }) => {
  return (
    <div>
      <button className="button" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Button;
