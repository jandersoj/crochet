import React from "react";
import Button from "./Button";
import { initialStitches, generateRandomKey } from "../App";
import "../css/Popup.css";

const Popup = ({ style, onClose }) => {
  return (
    <div className="popup" style={style}>
      <button onClick={onClose} style={{ position: "absolute", top: 5, right: 5 }}>
        X
      </button>
      <div className="stitch-buttons">
        <h3> IN DEVELOPMENT just click the x</h3>
        {initialStitches.map((stitch) => (
          <Button key={generateRandomKey()}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
      <p> save here </p>{" "}
    </div>
  );
};

export default Popup;
