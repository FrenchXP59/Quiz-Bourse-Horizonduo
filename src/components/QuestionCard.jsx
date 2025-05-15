// src/components/QuestionCard.jsx
import React, { useState, useEffect } from "react";

export default function QuestionCard({ data, onAnswer, onNext }) {
  const { question, options, answerIndex, explanation } = data;
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

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
            onClick={onNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
