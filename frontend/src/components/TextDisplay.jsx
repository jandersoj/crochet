import React, { useEffect, useState } from "react";
import "../css/TextDisplay.css";

const TextDisplay = ({ updateChart, generateRandomKey }) => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      console.log("fetchChartData called");
      try {
        const response = await fetch("http://127.0.0.1:5000/get-chart-data");
        const data = await response.json();
        console.log("chart fetched", data);
        setRounds(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
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
    <div className="text">
      {rounds.map((round, idx) => (
        <div key={generateRandomKey()} className="round-text">
          <b>Round {idx + 1}: </b> {formatStitches(round.stitches)}
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
