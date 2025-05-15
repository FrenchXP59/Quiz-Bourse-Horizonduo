import React, { useState } from "react";
import Home from "./components/Home";
import ChallengeSelector from "./components/ChallengeSelector";
import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import { loadQuiz } from "./data";

export default function App() {
  const [step, setStep] = useState("home"); // "home" | "challenge" | "quiz" | "finished"
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  // Lance la sélection du challenge
  const goToChallenge = () => setStep("challenge");

  // Lance le quiz après choix du challenge (nbQuestions)
  const startQuiz = (nbQuestions = 5) => {
    const qs = loadQuiz().slice(0, nbQuestions); // on prend le nombre demandé
    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setStep("quiz");
  };

  // Gestion des réponses
  const handleAnswer = (correct) => {
    if (correct) setScore((s) => s + 1);
  };

  // Question suivante ou score final
  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
    } else {
      setStep("finished");
    }
  };

  // Affichage selon le step
  if (step === "finished") {
    return (
      <ScoreBoard
        score={score}
        total={questions.length}
        onReplay={goToChallenge}
      />
    );
  }

  if (step === "quiz") {
    return (
      <QuestionCard
        data={questions[currentIdx]}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    );
  }

  if (step === "challenge") {
    return (
      <ChallengeSelector onSelect={startQuiz} />
    );
  }

  // Par défaut : écran accueil
  return <Home onStart={goToChallenge} />;
}