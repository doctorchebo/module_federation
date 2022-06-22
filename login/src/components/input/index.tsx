import React from "react";
import "./input.css";

interface props {
  placeholder: string;
}

const Input = ({placeholder}: props) => {
  return (
    <input 
      className="input-field"
      placeholder = {placeholder}
    />
  )
};

export default Input;
