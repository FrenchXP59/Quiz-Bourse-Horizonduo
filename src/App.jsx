import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ChallengeSelector from "./components/ChallengeSelector";
import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import ModalLeaderboard from "./components/ModalLeaderboard";
import MyBadges from "./pages/MyBadges";
import { loadQuizBalanced, allLots } from "./data";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [step, setStep] = useState("home");

  // ---- Logique quiz ----
  const goToChallenge = () => setStep("challenge");
  const startQuiz = (nbQuestions = 5) => {
    const qs = loadQuizBalanced(Object.keys(allLots), nbQuestions);
    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setStep("quiz");
  };
  const handleAnswer = (correct) => {
    if (correct) setScore((s) => s + 1);
  };
  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
    } else {
      setStep("finished");
    }
  };

  // ---- ROUTING ----
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffbe8] via-[#f9fafb] to-[#f5e6c4]">
        <Routes>
          <Route
            path="/"
            element={
              step === "finished" ? (
                <>
                  <ScoreBoard
                    score={score}
                    total={questions.length}
                    onReplay={goToChallenge}
                    onHome={() => setStep("home")}
                    onShowLeaderboard={() => setShowLeaderboard(true)}
                  />
                  <ModalLeaderboard
                    open={showLeaderboard}
                    onClose={() => setShowLeaderboard(false)}
                  />
                </>
              ) : step === "quiz" ? (
                <QuestionCard
                  data={questions[currentIdx]}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                />
              ) : step === "challenge" ? (
                <ChallengeSelector onSelect={startQuiz} />
              ) : (
                <Home onStart={goToChallenge} />
              )
            }
          />
          <Route path="/mybadges" element={<MyBadges />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}