import React from "react";
import "../css/Header.css";

const Header = ({ downloadClick }) => {
  return (
    <>
      <header id="heading">
        <div id="content">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSerr6WVqdaahEBhwsGJl0uA1rEHzuN_gTzTWUWFd4OGFJm8Jw/viewform?usp=dialog">
            User survey!!
          </a>
          <h1> Circldelic </h1>
          <div id="buttons">
            <button id="downloadImage" onClick={downloadClick}>
              Download your creation!
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
