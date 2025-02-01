import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = ({ updateScore }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
  const [score, setScore] = useState(0); // Track score
  const [badges, setBadges] = useState([]); // Track earned badges
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch quiz data from API
    axios
      .get("http://localhost:5000/api/quiz")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Handle answer selection
  const handleAnswerSelection = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1); // Increment score if the answer is correct

      // Optionally, add badges based on score
      if (score + 1 >= 5) {
        setBadges([...badges, "Expert"]);
      } else if (score + 1 >= 3) {
        setBadges([...badges, "Intermediate"]);
      }
    }

    // Move to the next question, or show the result if it's the last question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final results after the last question
      updateScore(score);
    }
  };

  // Render loading state if questions are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Question: {questions[currentQuestion]?.question}</h2>
      <div>
        {questions[currentQuestion]?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        <h3>Your Score: {score}</h3>
        <h4>Badges Earned:</h4>
        <ul>
          {badges.length > 0 ? (
            badges.map((badge, index) => <li key={index}>{badge}</li>)
          ) : (
            <li>No badges yet!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
