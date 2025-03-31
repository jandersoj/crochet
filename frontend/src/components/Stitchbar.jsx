import React, { useState } from "react";
import Button from "./Button.jsx";
import "../css/Stitchbar.css";

const Stitchbar = ({ stitches, onSelect, onGenerateRound, handleSubmit, generateRandomKey }) => {
  const [selectedStitches, setSelectedStitches] = useState([]);
  const [gettingSequence, setGettingSequence] = useState(false);

  const handleClearAll = async () => {
    var clearConfirm = confirm("Are you sure that you want to clear all? This action cannot be undone");
    if (clearConfirm) {
      console.log("confirmed clearing...");
      try {
        const response = await fetch("http://127.0.0.1:5000/clear-chart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(null),
        });

        const result = await response.json();
        console.log("Submitted:", result);
        onGenerateRound(); // Trigger the update in App.jsx
      } catch (error) {
        console.error("Error:", error);
      }
      location.reload();
    }
  };

  const handleSelect = (stitch) => {
    if (gettingSequence) {
      onSelect(stitch);
      setSelectedStitches((prevSelectedStitches) => {
        return [...prevSelectedStitches, stitch];
      });
    }
  };

  const handleNewRound = () => {
    console.log("new round button clicked");
    setGettingSequence(true);
  };

  const handleGenerateRound = () => {
    console.log("generate round button clicked");
    handleSubmit(selectedStitches);
    console.log("handled submit");
    setGettingSequence(false);
    setSelectedStitches([]);
  };
  const handleClearSelection = () => {
    console.log("clear selection button clicked");
    setSelectedStitches([]);
  };

  return (
    <>
      <div className="creation-buttons">
        <Button onClick={handleClearAll}>Clear all</Button>
        <Button onClick={() => console.log("undo button clicked")}>Undo</Button>
        <Button onClick={() => console.log("redo button clicked")}>Redo</Button>
        <Button onClick={handleClearSelection}>Clear selection</Button>
      </div>

      <section className="getting-sequence">
        <div className="selection">
          {selectedStitches.map((stitch) => (
            <div key={generateRandomKey()}>
              <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
            </div>
          ))}
        </div>

        {!gettingSequence && <Button onClick={handleNewRound}>Add Round</Button>}
        {gettingSequence && <Button onClick={handleGenerateRound}>Generate Round</Button>}
      </section>

      <div className="stitch-buttons">
        {stitches.map((stitch) => (
          <Button key={generateRandomKey()} onClick={() => handleSelect(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Stitchbar;
