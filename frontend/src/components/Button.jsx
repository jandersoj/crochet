import React from "react";

function Button({ onClick, children, ...rest }) {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
