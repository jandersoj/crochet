import React, { use, useState } from "react";
import Button from "./Button";
import { initialStitches, generateRandomKey } from "../App";
import "../css/Popup.css";
import { apiUrl } from "../api_url.js";

const Popup = ({ style, onClose, stitchClicked }) => {
  const [chosenStitch, setChosenStitch] = useState([]);

  const handleStitchClick = (stitch) => {
    console.log(`select ${stitch.name} for ${stitchClicked.stitchIndex}, ${stitchClicked.roundIndex} clicked`);
    setChosenStitch(stitch);
    handleSave();
  };

  const handleSave = async () => {
    console.log("changing selected stitch...");
    try {
      const response = await fetch(`${apiUrl}/update-stitch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stitchId: stitchClicked.stitchId,
          roundIndex: stitchClicked.roundIndex,
          stitchIndex: stitchClicked.stitchIndex,
          newStitch: chosenStitch,
        }),
      });

      const result = await response.json();
      console.log("Submitted:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup" style={style}>
      <button onClick={onClose} style={{ position: "absolute", top: 5, right: 5 }}>
        X
      </button>
      <div className="stitch-buttons">
        <h3> IN DEVELOPMENT just click the x</h3>
        {initialStitches.map((stitch) => (
          <Button key={generateRandomKey()} onClick={() => handleStitchClick(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
      <p> save here </p>{" "}
    </div>
  );
};

export default Popup;
