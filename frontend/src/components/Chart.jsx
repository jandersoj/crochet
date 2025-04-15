import React, { useEffect, useState, useRef } from "react";
import "../css/Chart.css";
import Round from "./Round";
import { apiUrl } from "../api_url.js";
import Checkbox from "./Checkbox.jsx";

import mrImage from "../images/mr.png"; // Import the image

const Chart = ({ stitches, updateChart, rounds, setRounds, generateRandomKey }) => {
  const chartRef = useRef(null); // Ref for the .chart container
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [magicRing, setMagicRing] = useState(false);

  useEffect(() => {
    // Calculate centerX and centerY based on the .chart container
    const updateCenter = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setCenterX(rect.left + rect.width / 2 - 50); // Adjust centerX to account for the container's position
        setCenterY(rect.top + rect.height / 2 - 25); // Adjust centerY to account for the container's position
      }
    };

    updateCenter(); // Initial calculation
    window.addEventListener("resize", updateCenter); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  const fetchChartData = async () => {
    console.log("fetchChartData called");
    try {
      const response = await fetch(`${apiUrl}/get-chart-data`);
      const data = await response.json();
      console.log("chart fetched", data);
      setRounds(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [updateChart]);

  return (
    <div className="chart" ref={chartRef}>
      <Checkbox
        className="mr-checkbox"
        // style={{ position: "absolute", top: "10px", left: "10px", margin: "10px" }}
        handleChecked={(event) => {
          setMagicRing(event.target.checked);
        }}
        label="Magic Ring"
      />
      <div className="chart-background">
        <div className="chart-body">
          {rounds.map((round, idx) => (
            <Round
              key={generateRandomKey()}
              round={round}
              roundIndex={idx}
              setRounds={setRounds}
              centerX={centerX}
              centerY={centerY}
            />
          ))}
          {magicRing && (
            <img
              src={mrImage}
              alt="Magic Ring"
              style={{
                position: "absolute",
                left: `${centerX}px`, // Center the image horizontally
                top: `${centerY}px`, // Center the image vertically
                width: "50px", // Adjust the size of the image
                height: "50px",
                // transform: "translate(-50%, -50%)", // Ensure the image is centered
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
