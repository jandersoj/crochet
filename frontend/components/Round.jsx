import React, { useEffect, useRef } from "react";
import Stitch from "./Stitch";

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const arrangeInCircle = (elements, radius) => {
  const count = elements.length;
  elements.forEach((el, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2; // Distribute evenly in a circle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    el.style.position = "absolute";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Calculate the rotation angle to face the center
    const rotationAngle = (angle * 180) / Math.PI + 90; // Convert to degrees and adjust
    el.style.transform = `rotate(${rotationAngle}deg)`;
  });
};

function clickedStitch(stitch) {
  console.log(stitch);
  return stitch;
}

const Round = ({ round, roundIndex, generateRandomKey }) => {
  const roundRef = useRef(null);

  useEffect(() => {
    if (roundRef.current) {
      const elements = roundRef.current.querySelectorAll(".stitch");
      if (elements.length === 1 && round.stitches[0].id === "mr") {
        // Special case for magic ring
        elements[0].style.position = "absolute";
        elements[0].style.left = `${centerX}px`;
        elements[0].style.top = `${centerY}px`;
      } else {
        const radius = 50 + roundIndex * 60; // Increase radius for each round
        arrangeInCircle(elements, radius); // Center at (centerX, centerY)
      }
    }
  }, [roundIndex, round.stitches]);

  return (
    <div className="round" ref={roundRef}>
      {round.stitches.map((stitch) => (
        <div key={generateRandomKey()} className="stitch">
          <Stitch />
          <img
            onClick={() => clickedStitch(stitch)}
            src={stitch.image}
            alt={stitch.name}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Round;
