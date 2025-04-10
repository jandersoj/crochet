import React, { useState } from "react";
import Popup from "./Popup";

const Stitch = ({ id, imageurl, name, stitchX, stitchY, stitchAngle }) => {
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 });

  const handleClick = () => {
    setPopup({
      visible: true,
      x: stitchX - 125,
      y: stitchY - 175,
    });
  };

  const closePopup = () => {
    setPopup({ visible: false, x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="stitch"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          position: "absolute",
          left: `${stitchX}px`, // Use stitchX for the stitch's position
          top: `${stitchY}px`, // Use stitchY for the stitch's position
          // transform: `rotate(${(stitchAngle * 180) / Math.PI + 90}deg)`, // Rotate the stitch
          // transformOrigin: "center",
        }}>
        <img
          src={imageurl}
          alt={name}
          style={{
            height: "50px",
            width: "50px",
            transform: `rotate(${(stitchAngle * 180) / Math.PI + 90}deg)`, // Rotate the stitch
            transformOrigin: "center",
            border: popup.visible ? "2px solid #40827d" : "none", // Add border when popup is visible
          }}
        />
      </div>
      {/* Conditionally render the Popup */}
      {popup.visible && (
        <Popup
          style={{
            position: "absolute",
            top: popup.y, // Use popup state for the popup's position
            left: popup.x, // Use popup state for the popup's position
            zIndex: 1000, // Ensure it appears above other components
          }}
          onClose={closePopup} // Pass the close function
        />
      )}
    </>
  );
};

export default Stitch;
