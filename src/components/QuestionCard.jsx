import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import timerIcon from "../assets/icons/timer.png";
import soundOn from "../assets/icons/sound_on.png";
import soundOff from "../assets/icons/sound_off.png";

export default function QuestionCard({ data, onAnswer, onNext }) {
  const { question, options, answerIndex, explanation } = data;
  const TIMER_DURATION = 15;

  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);

  // Mute (stocké en localStorage)
  const [isMuted, setIsMuted] = useState(() =>
    localStorage.getItem("quizMute") === "true"
  );
  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    localStorage.setItem("quizMute", newMute);
  };

  // Jouer un son (sauf si mute)
  const playSound = (src, vol = 1) => {
    if (isMuted) return;
    const audio = new Audio(src);
    audio.volume = vol;
    audio.play();
  };

  // Reset pour chaque question
  useEffect(() => {
    setSelected(null);
    setIsAnswered(false);
    setTimer(TIMER_DURATION);
  }, [data]);

  // Gestion timer + sons
  useEffect(() => {
    if (isAnswered) return;
    if (timer === 0) {
      setIsAnswered(true);
      playSound("/sounds/wrongAnswer.mp3");
      onAnswer(false);
      return;
    }
    if (timer !== TIMER_DURATION) {
      playSound("/sounds/tick.mp3", 0.7);
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isAnswered, onAnswer, isMuted]);

  // Clic sur une option
  const handleSelect = (idx) => {
    if (isAnswered) return;
    playSound("/sounds/buttonClick.mp3", 0.6);
    setSelected(idx);
    setIsAnswered(true);
    if (idx === answerIndex) {
      playSound("/sounds/goodAnswer.mp3", 0.7);
    } else {
      playSound("/sounds/wrongAnswer.mp3", 0.7);
    }
    onAnswer(idx === answerIndex);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      {/* Question */}
      <h2 className="text-xl font-semibold mb-2 text-center">{question}</h2>

      {/* Timer (restauré au format grand) */}
      <Timer seconds={timer} icon={timerIcon} />

      {/* Réponses */}
      <div className="space-y-3">
        {options.map((opt, idx) => {
          let base = "w-full text-left p-3 rounded-xl border transition-colors ";
          if (!isAnswered) {
            base += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          } else if (idx === answerIndex) {
            base += "border-green-500 bg-green-100";
          } else if (idx === selected) {
            base += "border-red-500 bg-red-100";
          } else {
            base += "border-gray-200 bg-white";
          }
          return (
            <button
              key={idx}
              className={base}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explication après réponse */}
      {isAnswered && explanation && (
        <p className="mt-4 text-sm text-gray-700">{explanation}</p>
      )}

      {/* Footer : mute à gauche, bouton suivant à droite */}
      {isAnswered && (
        <div className="mt-4 flex items-center justify-between">
          {/* Bouton Mute */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
          >
            <img
              src={isMuted ? soundOff : soundOn}
              alt={isMuted ? "Son coupé" : "Son activé"}
              className="w-6 h-6"
            />
          </button>
          {/* Bouton Suivant */}
          <button
            onClick={() => {
              playSound("/sounds/buttonClick.mp3", 0.7);
              onNext();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}