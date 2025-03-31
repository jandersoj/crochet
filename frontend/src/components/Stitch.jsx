import React from "react";

const Stitch = ({ id, stitchHeight, stitchWidth, image, name }) => {
  return (
    <div className="stitch">
      <img src={image} alt={name} />
      {/* <h3>{name}</h3>
      <p>Height: {stitchHeight}</p>
      <p>Width: {stitchWidth}</p> */}
    </div>
  );
};

export default Stitch;
