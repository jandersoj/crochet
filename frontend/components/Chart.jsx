import React, { useEffect, useState } from "react";
import "../css/Chart.css";
import Round from "./Round";

const Chart = ({ stitches, updateChart, rounds, setRounds, generateRandomKey }) => {
  const startingStitches = stitches;
  useEffect(() => {
    fetchChartData();
  }, [updateChart]); // Fetch data whenever updateChart changes

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

  return (
    <div className="chart">
      {rounds.map((round, idx) => (
        <Round key={generateRandomKey()} round={round} roundIndex={idx} generateRandomKey={generateRandomKey} />
      ))}
    </div>
  );
};

export default Chart;
