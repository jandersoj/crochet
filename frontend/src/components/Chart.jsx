import React, { useEffect, useState, useRef } from "react";
import "../css/Chart.css";
import Round from "./Round";
import { apiUrl } from "../api_url.js";
import Checkbox from "./Checkbox.jsx";

import mrImage from "../images/mr.png"; //magic ring

const Chart = ({ setUpdateChart, updateChart, rounds, setRounds, generateRandomKey, startingLength }) => {
  const chartRef = useRef(null); //ref for the .chart container
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [magicRing, setMagicRing] = useState(false);

  useEffect(() => {
    //calculate centerX and centerY based on the .chart container so that rounds are evenly placed
    const updateCenter = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setCenterX(rect.left + rect.width / 2 - 50);
        setCenterY(rect.top + rect.height / 2 - 25);
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter); // Recalculate on window resize. works... ok

    return () => {
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  //pulls the chart data from the backend
  const fetchChartData = async () => {
    console.log("fetchChartData called");
    try {
      const response = await fetch(`${apiUrl}/get-chart-data`, {
        method: "GET",
        credentials: "include",
      });
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
              startingLength={startingLength}
              setUpdateChart={setUpdateChart}
            />
          ))}
          {magicRing && (
            <img
              src={mrImage}
              alt="Magic Ring"
              style={{
                position: "absolute",
                left: `${centerX}px`, // Center horizontally
                top: `${centerY}px`, // Center ertically
                width: "50px", // Adjust size of the image
                height: "50px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
