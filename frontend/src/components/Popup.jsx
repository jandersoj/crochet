import React from "react";
import Button from "./Button";
import { initialStitches, generateRandomKey } from "../App";
import "../css/Popup.css";
import { apiUrl } from "../api_url.js";

const Popup = ({ style, onClose, stitchClicked, setRounds }) => {
  const handleStitchClick = async (stitch) => {
    console.log(
      `Clicked stitch: ${stitch.name} for round ${stitchClicked.roundIndex}, stitch ${stitchClicked.stitchIndex}`
    );

    try {
      // Send the selected stitch and indices to the backend
      const response = await fetch(`${apiUrl}/update-stitch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roundIndex: stitchClicked.roundIndex,
          stitchIndex: stitchClicked.stitchIndex,
          newStitch: {
            id: stitch.id,
            name: stitch.name,
            image: stitch.image,
          },
        }),
      });

      const result = await response.json();
      console.log("Submitted:", result);
      setRounds(result);
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the popup after sending the data
    onClose();
  };

  return (
    <div className="popup" style={style}>
      <button onClick={onClose} style={{ position: "absolute", top: 5, right: 5 }}>
        X
      </button>
      <div className="stitch-buttons">
        <h3>Select a replacement stitch:</h3>
        {initialStitches.map((stitch) => (
          <Button key={generateRandomKey()} onClick={() => handleStitchClick(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Popup;
