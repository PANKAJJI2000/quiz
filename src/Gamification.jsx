import React, { useState } from "react";

const Gamification = ({ score }) => {
  const [badges, setBadges] = useState([]);

  // Check if a user earned a badge
  const checkBadges = () => {
    if (score >= 5 && !badges.includes("Quiz Master")) {
      setBadges([...badges, "Quiz Master"]);
    }
    if (score >= 3 && !badges.includes("Sharp Shooter")) {
      setBadges([...badges, "Sharp Shooter"]);
    }
    if (score === 0 && !badges.includes("Beginner")) {
      setBadges([...badges, "Beginner"]);
    }
  };

  // Call the function to check badges every time the score changes
  React.useEffect(() => {
    checkBadges();
  }, [score]);

  return (
    <div>
      <h2>Your Score: {score}</h2>
      <h3>Badges Earned:</h3>
      <ul>
        {badges.length > 0 ? (
          badges.map((badge, index) => <li key={index}>{badge}</li>)
        ) : (
          <p>No badges yet!</p>
        )}
      </ul>
    </div>
  );
};

export default Gamification;
