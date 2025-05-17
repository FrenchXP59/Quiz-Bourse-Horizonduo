import React from "react";
import { useNavigate } from "react-router-dom";
import targetIcon from "../assets/icons/target.png";
import chartIcon from "../assets/icons/chart.png";
import helpIcon from "../assets/icons/help_button.png";
import folderIcon from "../assets/icons/folder.png";

export default function ChallengeSelector() {
  const navigate = useNavigate();

  const CHALLENGES = [
    {
      icon: targetIcon,
      label: "20 questions aléatoires",
      action: () => navigate("/quiz?mode=random20"),
    },
    {
      icon: chartIcon,
      label: "40 questions aléatoires",
      action: () => navigate("/quiz?mode=random40"),
    },
    {
      icon: helpIcon,
      label: "Par difficulté",
      action: () => navigate("/difficulty"),
    },
    {
      icon: folderIcon,
      label: "Par thème",
      action: () => navigate("/select-category"),
    },
  ];

  return (
        <div className="flex flex-col items-center min-h-screen justify-center
          bg-gradient-to-b from-[#ecd9ff] via-[#d6e9fb] to-[#f3f3ff]
          px-4 py-10 pb-[calc(env(safe-area-inset-bottom)+4rem)]">
      <div className="
        bg-white/90 border border-[#e2e8f0] rounded-xl p-7 w-full max-w-md shadow-xl
        flex flex-col items-center
      ">
        <h2 className="text-2xl font-bold text-center mb-2">Choisis ton défi !</h2>
        <p className="text-center text-gray-600 mb-7">
          Comment veux-tu jouer ?
        </p>
        <div className="flex flex-col gap-5 w-full">
          {CHALLENGES.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className="
                flex items-center gap-4 p-5 bg-white border border-blue-200 rounded-xl w-full
                font-semibold text-lg shadow-sm
                hover:shadow-lg hover:scale-105 hover:bg-blue-50 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-300
                active:scale-100
              "
            >
              <img
                src={btn.icon}
                alt=""
                className="w-12 h-12 md:w-16 md:h-16 transition-all duration-200"
                draggable={false}
              />
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}