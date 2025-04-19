import React from "react";
import Button from "./Button";
import { initialStitches, generateRandomKey } from "../App";
import "../css/Popup.css";
import { apiUrl } from "../api_url.js";

const Popup = ({ style, onClose, stitchClicked, setRounds, setUpdateChart }) => {
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
        credentials: "include",
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

      setUpdateChart((prev) => !prev);
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
        {initialStitches.map((stitch) => {
          const [hovered, setHovered] = React.useState(false);
          return (
            <Button
              key={generateRandomKey()}
              onClick={() => handleStitchClick(stitch)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                height: "75px",
                width: "75px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                position: "relative",
              }}>
              {hovered ? (
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>{stitch.name}</span>
              ) : (
                <img
                  src={stitch.image}
                  alt={stitch.name}
                  style={{
                    height: "50px",
                    width: "50px",
                    background: "transparent",
                    objectFit: "contain",
                  }}
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Popup;
