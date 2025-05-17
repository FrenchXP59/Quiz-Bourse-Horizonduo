import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "cultureg", label: "🧠 Connaissances générales" },
  { key: "histoire", label: "🏛️ Histoire & Institutions" },
  { key: "monde", label: "🌍 Monde & Environnement" },
  { key: "sciences", label: "📐 Sciences & Logique" },
  { key: "societe", label: "💰 Société & Économie" },
  { key: "jeunesse", label: "🎨 Culture & Jeunesse" },
];

export default function SelectCategory() {
  const navigate = useNavigate();

  const handleSelect = (catKey) => {
    navigate(`/quiz?mode=byCategory&cat=${catKey}`);
  };

  return (
    <div className="p-6 text-center max-w-md mx-auto animate-fade-in-up">
      <h1 className="text-2xl font-bold mb-6">Choisis ta catégorie</h1>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleSelect(cat.key)}
            className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl shadow hover:bg-blue-50 hover:scale-105 transition-all duration-200"
          >
            {cat.label}
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