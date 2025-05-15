// src/App.jsx
import React, { useState } from "react";
import Home from "./components/Home";
import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import { loadQuiz } from "./data";

export default function App() {
  const [started, setStarted] = useState(false);      // false | true | "finished"
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  console.log("🔄 App render – started =", started, "currentIdx =", currentIdx, "score =", score);

  // Lance le quiz
  const startQuiz = () => {
    const qs = loadQuiz();           // charge tous les lots, shuffle inclus
    console.log("🧩 startQuiz → questions chargées:", qs);
    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setStarted(true);
  };

  // On répond à la question courante
  const handleAnswer = (correct) => {
    console.log("🎯 handleAnswer – correct =", correct);
    if (correct) setScore((s) => s + 1);
  };

  // Bouton Suivant
  const handleNext = () => {
    console.log("➡️ handleNext – currentIdx =", currentIdx, "questions.length =", questions.length);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
    } else {
      setStarted("finished");
    }
  };

  // Si on est arrivé au score final
  if (started === "finished") {
    console.log("🏁 Quiz finished – score =", score, "/", questions.length);
    return (
      <ScoreBoard
        score={score}
        total={questions.length}
        onReplay={startQuiz}
      />
    );
  }

  // Affichage des questions
  return started ? (
    <QuestionCard
      data={questions[currentIdx]}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  ) : (
    <Home onStart={startQuiz} />
  );
}