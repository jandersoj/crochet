import React from "react";
import Button from "./Button.jsx";
import "../css/Popup.css";

const Popup = ({ stitches, generateRandomKey }) => {
  return (
    <div className="popup">
      <h1>Popup</h1>
      <div className="stitch-buttons">
        {stitches.map((stitch) => (
          <Button key={generateRandomKey()}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
      <p> save here </p>
    </div>
  );
};

export default Popup;
