<<<<<<< HEAD
import React, { useState } from "react";
import Home from "./components/Home";
import ChallengeSelector from "./components/ChallengeSelector";
=======
// src/App.jsx
import React, { useState } from "react";
import Home from "./components/Home";
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import { loadQuiz } from "./data";

export default function App() {
<<<<<<< HEAD
  const [step, setStep] = useState("home"); // "home" | "challenge" | "quiz" | "finished"
=======
  const [started, setStarted] = useState(false);      // false | true | "finished"
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

<<<<<<< HEAD
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
=======
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
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
    return (
      <ScoreBoard
        score={score}
        total={questions.length}
<<<<<<< HEAD
        onReplay={goToChallenge}
=======
        onReplay={startQuiz}
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
      />
    );
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
}