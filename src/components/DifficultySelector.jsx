import React from "react";
import { useNavigate } from "react-router-dom";

export default function DifficultySelector() {
  const navigate = useNavigate();

  const handleSelect = (level) => {
    navigate(`/quiz?mode=byDifficulty&level=${level}`);
  };

  const levels = [
    { label: "🟢 Facile", value: "facile", color: "bg-green-50" },
    { label: "🟡 Moyen", value: "moyen", color: "bg-yellow-50" },
    { label: "🔴 Difficile", value: "difficile", color: "bg-red-50" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fdfcff] via-[#eef2f6] to-[#e6eaf2] p-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 text-center">Choisis ta difficulté</h2>
      <div className="w-full max-w-sm space-y-4">
        {levels.map((lvl) => (
          <button
            key={lvl.value}
            onClick={() => handleSelect(lvl.value)}
            className={`${lvl.color} w-full px-6 py-4 rounded-xl text-lg font-semibold shadow hover:scale-105 hover:bg-white transition`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 text-sm text-blue-600 underline hover:text-blue-800 transition"
      >
        ← Retour à l’accueil
      </button>
    </div>
  );
}