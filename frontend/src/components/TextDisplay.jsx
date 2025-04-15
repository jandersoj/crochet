import React, { useEffect, useState } from "react";
import "../css/TextDisplay.css";
import { apiUrl } from "../api_url.js";
const TextDisplay = ({ updateChart, generateRandomKey }) => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      // console.log("fetchChartData called");
      try {
        const response = await fetch(`${apiUrl}/get-chart-data`);
        const data = await response.json();
        // console.log("chart fetched", data);
        setRounds(data);
      } catch (error) {
        // console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [updateChart]); // Fetch data whenever updateChart changes

  const formatStitches = (stitches) => {
    let stitchString = "";
    let count = 1;

    for (let i = 0; i < stitches.length; i++) {
      if (i < stitches.length - 1 && stitches[i].id === stitches[i + 1].id) {
        count++;
      } else {
        if (count > 1 && stitches[i].id === "ch") {
          //if they're chains
          stitchString += `${stitches[i].id}${count}, `; //format with the count after
        } else if (count > 1) {
          //if not
          stitchString += ` ${count}${stitches[i].id}, `; //format with the count before
        } else {
          stitchString += `${stitches[i].id}, `; //just make it normal
        }
        count = 1;
      }
    }

    // Remove the trailing comma and space
    stitchString = stitchString.trim().replace(/,$/, "");

    console.log("Formatted stitches:", stitchString);
    return stitchString;
  };

  return (
    <>
      <div className="text">
        {rounds.map((round, idx) => (
          <div key={generateRandomKey()} className="round-text">
            <b>Round {idx + 1}: </b> {formatStitches(round.stitches)}
          </div>
        ))}
      </div>
      <div className="links">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSerr6WVqdaahEBhwsGJl0uA1rEHzuN_gTzTWUWFd4OGFJm8Jw/viewform?usp=dialog">
          User survey
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSczEhqIr0d3leDdSSkogDJNjJh9AiFOOasYs2GCTGcHXDFu3A/viewform?usp=sharing">
          Project submission
        </a>
        <a href="https://github.com/jandersoj/crochet">Circldelic on github</a>
      </div>
    </>
  );
};

export default TextDisplay;
