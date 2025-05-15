<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import timerIcon from "../assets/icons/timer.png";
=======
// src/components/QuestionCard.jsx
import React, { useState, useEffect } from "react";
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad

export default function QuestionCard({ data, onAnswer, onNext }) {
  const { question, options, answerIndex, explanation } = data;
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

<<<<<<< HEAD
  // TIMER
  const TIMER_DURATION = 15;
  const [timer, setTimer] = useState(TIMER_DURATION);

  // Helper pour jouer un son (depuis public)
  const playSound = (src, vol = 1) => {
    const audio = new Audio(src);
    audio.volume = vol;
    audio.play();
  };

  // Reset quand la question change
  useEffect(() => {
    setSelected(null);
    setIsAnswered(false);
    setTimer(TIMER_DURATION);
  }, [data]);

  // Tick son à chaque seconde
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
    // eslint-disable-next-line
  }, [timer, isAnswered, onAnswer]);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    playSound("/sounds/buttonClick.mp3", 0.6);
    setSelected(idx);
    setIsAnswered(true);
    // Feedback bonne/mauvaise réponse
    if (idx === answerIndex) {
      playSound("/sounds/goodAnswer.mp3", 0.7);
    } else {
      playSound("/sounds/wrongAnswer.mp3", 0.7);
    }
    onAnswer(idx === answerIndex);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">{question}</h2>
      <Timer seconds={timer} icon={timerIcon} />

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
=======
  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    onAnswer(idx === answerIndex);
  };

  useEffect(() => {
    // reset quand la question change
    setSelected(null);
    setIsAnswered(false);
  }, [data]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>

      <div className="space-y-3">
        {options.map((opt, idx) => {
          // classes de base
          let base =
            "w-full text-left p-3 rounded-xl border transition-colors ";

          // si pas encore répondu, on a le style par défaut + hover
          if (!isAnswered) {
            base += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          } else {
            // si répondu, on marque :
            // - toujours la bonne en vert
            if (idx === answerIndex) {
              base += "border-green-500 bg-green-100";
            }
            // - et si on a cliqué sur une mauvaise, on la marque en rouge
            else if (idx === selected) {
              base += "border-red-500 bg-red-100";
            } else {
              // les autres restent neutres avec un fond blanc
              base += "border-gray-200 bg-white";
            }
          }

>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
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

      {isAnswered && explanation && (
        <p className="mt-4 text-sm text-gray-700">{explanation}</p>
      )}

      {isAnswered && (
        <div className="mt-4 flex justify-end">
          <button
<<<<<<< HEAD
            onClick={() => {
              playSound("/sounds/buttonClick.mp3", 0.7);
              onNext();
            }}
=======
            onClick={onNext}
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> dc26cc741a8219b1a36f13ee60b23d82782592ad
