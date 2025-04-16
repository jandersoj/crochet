import React, { useState } from "react";

function Checkbox({ handleChecked, label }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => {
            setIsChecked(event.target.checked); // Update local state ig
            handleChecked(event);
          }}
          style={{
            appearance: "none", // Remove default checkbox styling
            width: "20px",
            height: "20px",
            border: "3px solid #6eb5c7",
            borderRadius: "20px",
            backgroundColor: isChecked ? "#1492a3" : "white", // heck yeahhhh ternary moment
            cursor: "pointer",
          }}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
