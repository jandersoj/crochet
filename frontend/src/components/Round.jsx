import React, { useEffect, useRef } from "react";
import Stitch from "./Stitch";

const Round = ({ round, roundIndex, setRounds, centerX, centerY }) => {
  const calculateCirclePositions = (count, radius) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2; // Distribute evenly in a circle
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, angle }; // Return x, y, and angle for each stitch
    });
  };

  const roundRef = useRef(null);

  const positions = calculateCirclePositions(round.stitches.length, 60 + roundIndex * 50);

  return (
    <div className="round" ref={roundRef}>
      {round.stitches.map((stitch, idx) => {
        const { x, y, angle } = positions[idx]; // Get x, y, and angle for this stitch
        return (
          <Stitch
            key={`stitchround_${roundIndex}_${idx}`}
            id={stitch.id}
            imageurl={stitch.image}
            stitchX={x}
            stitchY={y}
            stitchAngle={angle}
            roundIndex={roundIndex}
            stitchIndex={idx}
            setRounds={setRounds}
          />
        );
      })}
    </div>
  );
};

export default Round;
