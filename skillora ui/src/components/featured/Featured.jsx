import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      navigate(`/gigs?search=${encodeURIComponent(trimmedInput)}`);
    }
  };

  const handlePopularClick = (term) => {
    setInput(term);
    navigate(`/gigs?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handlePopularClick("Design")}>
              Web Design
            </button>
             <button onClick={() => handlePopularClick("AI Services")}>
              AI Services
            </button>
            <button onClick={() => handlePopularClick("music")}>
              Music
            </button>
            <button onClick={() => handlePopularClick("webdev")}>
              Web Dev
            </button>
           
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
