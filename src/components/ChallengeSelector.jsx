// src/components/ChallengeSelector.jsx
import React from "react";
import targetIcon from "../assets/icons/target.png";
import chartIcon from "../assets/icons/chart.png";
import trophyIcon from "../assets/icons/trophy.png";

const CHALLENGES = [
  { label: "5 questions", value: 5, icon: targetIcon },
  { label: "10 questions", value: 10, icon: chartIcon },
  { label: "15 questions", value: 15, icon: trophyIcon },
];

export default function ChallengeSelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-2">Choisis ton défi !</h2>
      <p className="text-gray-600 mb-6">Combien de questions veux-tu tenter ?</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {CHALLENGES.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full flex items-center gap-4 py-3 rounded-xl font-semibold border border-blue-300 hover:bg-blue-50 transition text-lg"
          >
            <img src={opt.icon} alt="" className="w-8 h-8" />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}