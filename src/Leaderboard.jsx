import React, { useState, useEffect } from "react";
import "./Leaderboard.css"; // Import the styles

const Leaderboard = ({ score }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [name, setName] = useState("");  // Track user input for name
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if score is submitted
  const [sortBy, setSortBy] = useState("score");  // Sort by score by default

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    if (savedLeaderboard) {
      setLeaderboard(savedLeaderboard);
    }
  }, []);

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle score submission
  const handleSubmit = () => {
    if (!name) {
      alert("Please enter your name!");
      return;
    }

    const newScore = { name, score };
    const updatedLeaderboard = [...leaderboard, newScore];
    updatedLeaderboard.sort((a, b) => (sortBy === "score" ? b.score - a.score : a.name.localeCompare(b.name))); // Sort by score or name

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard)); // Save to localStorage
    setIsSubmitted(true); // Set submitted state
  };

  // Handle sorting
  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sortedLeaderboard = [...leaderboard].sort((a, b) => (criteria === "score" ? b.score - a.score : a.name.localeCompare(b.name)));
    setLeaderboard(sortedLeaderboard);
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {/* Display the name input and submit button if not submitted */}
      {!isSubmitted ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <button onClick={handleSubmit}>Submit Score</button>
        </div>
      ) : (
        <p>Score submitted! Thanks for playing.</p>
      )}

      {/* Sort options */}
      <div>
        <button onClick={() => handleSort("score")}>Sort by Score</button>
        <button onClick={() => handleSort("name")}>Sort by Name</button>
      </div>

      {/* Leaderboard List */}
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => (
            <li key={index}>
              <span>{player.name}</span> - <span>{player.score} points</span>
            </li>
          ))
        ) : (
          <p>No leaderboard data yet!</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
