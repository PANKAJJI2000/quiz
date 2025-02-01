import React, { useState } from "react";
import Quiz from "./Quiz";
import Gamification from "./Gamification";
import Leaderboard from "./Leaderboard";

const App = () => {
  const [score, setScore] = useState(0);

  // Update score function passed to Quiz
  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <p>Score: {score}</p>
      <Quiz updateScore={updateScore} />
      <Gamification score={score} />
      <Leaderboard score={score} />
    </div>
  );
};

export default App;
