import React, { useState, useRef } from "react";
import Header from "./components/Header.jsx";
import Stitchbar from "./components/Stitchbar.jsx";
import Chart from "./components/Chart.jsx";
import TextDisplay from "./components/TextDisplay.jsx";
import "./App.css";
import { apiUrl } from "./api_url.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
//stitch images:

import twodcinoneImage from "./images/2dcin1.png";
import twohdcinoneImage from "./images/2hdcin1.png";
import threedcinoneImage from "./images/3dcin1.png";
import bobbleImage from "./images/bobble.png";
import chslstImage from "./images/ch-slst.png";
import chImage from "./images/ch.png";
import ch1upImage from "./images/ch1up.png";
import ch2upImage from "./images/ch2up.png";
import ch3upImage from "./images/ch3up.png";
import dcImage from "./images/dc.png";
import hdcImage from "./images/hdc.png";
import picotImage from "./images/picot.png";
import popcornImage from "./images/popcorn.png";
import puffImage from "./images/puff.png";
import scImage from "./images/sc.png";
import slstImage from "./images/slst.png";
import trImage from "./images/tr.png";
import blankImage from "./images/blank.png";

export const initialStitches = [
  //construction stitches
  { id: "ch1up", name: "Chain 1 Up", image: ch1upImage },
  { id: "ch2up", name: "Chain 2 Up", image: ch2upImage },
  { id: "ch3up", name: "Chain 3 Up", image: ch3upImage },
  { id: "chslst", name: "Chain + Slip Stitch", image: chslstImage },
  { id: "skip", name: "Skip", image: blankImage },

  //basic stitches
  { id: "slst", name: "Slip Stitch", image: slstImage },
  { id: "ch", name: "Chain", image: chImage },
  { id: "sc", name: "Single Crochet", image: scImage },
  { id: "hdc", name: "Half Double Crochet", image: hdcImage },
  { id: "dc", name: "Double Crochet", image: dcImage },
  { id: "tr", name: "Treble Crochet", image: trImage },

  //big stitches
  { id: "2dcin1", name: "2 Double Crochet in 1", image: twodcinoneImage },
  { id: "2hdcin1", name: "2 Half Double Crochet in 1", image: twohdcinoneImage },
  { id: "3dcin1", name: "3 Double Crochet in 1", image: threedcinoneImage },

  //decorative stitches
  { id: "bobble", name: "Bobble", image: bobbleImage },
  { id: "popcorn", name: "Popcorn", image: popcornImage },
  { id: "puff", name: "Puff Stitch", image: puffImage },
  { id: "picot", name: "Picot", image: picotImage },
];

export const generateRandomKey = () => {
  return Math.random().toString(36).substring(2, 12);
};

export default function App() {
  //previously had the initial stitches here but wanted to export

  const [submitted, setSubmitted] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [roundCount, setRoundCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedStitch, setSelectedStitch] = useState(null);
  const [startingSts, setStartingSts] = useState([]); //temp
  const [updateChart, setUpdateChart] = useState(false); // State to trigger chart update

  const handleStartingSts = async (event) => {
    event.preventDefault();
    const numChains = parseInt(inputValue, 10);
    const chainStitches = Array(numChains).fill({ id: "ch", name: "Chain", image: chImage, h: 1, w: 1 });
    setRounds([{ stitches: chainStitches }]);
    await handleSubmit(chainStitches);
    setStartingSts(numChains);

    setSubmitted(true);
    setUpdateChart((prev) => !prev); // Trigger chart update
    setRoundCount(1); // Initialize round count to 1
  };

  const handleGenerateRound = () => {
    console.log("handleGenerateRound in App.jsx called");
    setUpdateChart((prev) => !prev); // Trigger chart update
    setRoundCount((prevCount) => prevCount + 1); // Increment round count
  };

  const handleSubmit = async (selectedStitches) => {
    const roundLength = startingSts * (1 + roundCount);
    console.log("roundLength", roundLength);

    if (selectedStitches.length === 0) {
      alert("Please select at least one stitch");
      return;
    }

    if (selectedStitches.length < roundLength) {
      //here's where we repeat the sequence to fill the round
      let temp = selectedStitches;
      while (temp.length < roundLength) {
        temp = [...temp, ...selectedStitches];
      }
      temp = temp.slice(0, roundLength); // make sure temp is exactly roundLength
      selectedStitches = temp;
    }

    console.log("Submitting:", selectedStitches);
    try {
      const response = await fetch(`${apiUrl}/submit-sequence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stitches: selectedStitches }),
      });

      const result = await response.json();
      console.log("Submitted:", result);
      handleGenerateRound(); // Trigger the update in App.jsx
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="Stitchbar">
          <Stitchbar
            stitches={initialStitches}
            startingSts={startingSts}
            onSelect={setSelectedStitch}
            onGenerateRound={handleGenerateRound}
            handleSubmit={handleSubmit}
            generateRandomKey={generateRandomKey}
          />
        </div>

        {!submitted ? (
          <section className="Setup">
            <div className="Instructions">
              <h2>Instructions will be here </h2>
            </div>
            <div className="getStartingSts">
              <form onSubmit={handleStartingSts}>
                <label htmlFor="startingStitches">Please enter the number of starting stitches:</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="startingStitches"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <>
            <div className="Chart">
              <Chart
                stitches={initialStitches}
                updateChart={updateChart}
                rounds={rounds}
                setRounds={setRounds}
                generateRandomKey={generateRandomKey}
              />
            </div>
          </>
        )}
        <div className="TextDisplay">
          <TextDisplay updateChart={updateChart} generateRandomKey={generateRandomKey} rounds={rounds} />
        </div>
      </main>
    </>
  );
}
