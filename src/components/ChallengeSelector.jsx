import React from "react";
import targetIcon from "../assets/icons/target.png";
import chartIcon from "../assets/icons/chart.png";
import trophyIcon from "../assets/icons/trophy.png";
import bullMascotte from "../assets/icons/bull-mascotte.png";

const CHALLENGES = [
  { icon: targetIcon, label: "5 questions", value: 5 },
  { icon: chartIcon, label: "10 questions", value: 10 },
  { icon: trophyIcon, label: "15 questions", value: 15 },
];

export default function ChallengeSelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center
      bg-gradient-to-b from-[#faf6ee] via-[#f3f8fe] to-[#faf6ee] py-10">
      <div className="
        bg-[#fcfcfc]/95 border border-[#ede9d7] rounded-xl p-7 w-full max-w-md shadow-xl
        flex flex-col items-center
      ">
        <h2 className="text-2xl font-bold text-center mb-2">Choisis ton défi !</h2>
        <p className="text-center text-gray-600 mb-7">
          Combien de questions veux-tu tenter ?
        </p>
        <div className="flex flex-col gap-6 w-full">
          {CHALLENGES.map((c, i) => (
            <button
              key={i}
              onClick={() => onSelect(c.value)}
              className="
                flex items-center gap-4 p-5 bg-white border border-blue-200 rounded-xl w-full
                font-semibold text-lg shadow-sm
                hover:shadow-lg hover:scale-105 hover:bg-blue-50 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-300
                active:scale-100
              "
            >
              <img
                src={c.icon}
                alt=""
                className="w-12 h-12 md:w-16 md:h-16 transition-all duration-200"
                draggable={false}
              />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <img
          src={bullMascotte}
          alt="Mascotte Bulle Bourse"
          className="block mx-auto mt-9 max-h-36 drop-shadow-md"
          style={{ filter: "drop-shadow(0 2px 8px #eeddb8)" }}
          draggable={false}
        />
      </div>
    </div>
  );
}