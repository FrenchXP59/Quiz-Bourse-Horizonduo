import React, { useEffect } from "react";
import scoreLow from "../assets/icons/score_low.png";
import scoreMedium from "../assets/icons/score_medium.png";
import scoreHigh from "../assets/icons/score_high.png";
import backIcon from "../assets/icons/back.png";

function getScoreInfo(score, max) {
  const pct = (score / max) * 100;
  if (pct < 40) {
    return {
      icon: scoreLow,
      message: "Niveau débutant – Les fondamentaux restent à consolider",
      level: "low",
    };
  }
  if (pct < 80) {
    return {
      icon: scoreMedium,
      message: "Bon niveau – Tu maîtrises l'essentiel, continue ainsi !",
      level: "medium",
    };
  }
  return {
    icon: scoreHigh,
    message: "Excellent – Tu pourrais former d'autres investisseurs !",
    level: "high",
  };
}

export default function ScoreBoard({ score, total, onReplay, onHome, onShowLeaderboard }) {
  // Sauvegarde localStorage (inchangé)
  useEffect(() => {
    const now = new Date().toLocaleDateString("fr-FR");
    const lastScore = score;
    const lastDate = now;
    let bestScore = parseInt(localStorage.getItem("bestScore") || "0", 10);
    let bestDate = localStorage.getItem("bestDate") || "";

    if (score > bestScore) {
      bestScore = score;
      bestDate = now;
      localStorage.setItem("bestScore", bestScore);
      localStorage.setItem("bestDate", bestDate);
    }
    localStorage.setItem("lastScore", lastScore);
    localStorage.setItem("lastDate", lastDate);
  }, [score]);

  const { icon, message, level } = getScoreInfo(score, total);

  const openNews = () => {
    window.open("https://horizonduo.net/news/bourse", "_blank");
  };

  // --- Rendu ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4 relative">

      {/* Badge MAJ en haut à droite */}
      <div className="absolute top-6 right-6 z-20">
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2 shadow">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          MAJ : Mai 2025
        </span>
      </div>

      {/* Bouton retour */}
      <button
        className="absolute top-5 left-4 p-2 rounded-full bg-white/90 shadow-lg hover:bg-blue-100 transition"
        onClick={onHome}
        aria-label="Retour à l'accueil"
        style={{ zIndex: 10 }}
      >
        <img src={backIcon} alt="Retour" className="w-14 h-14" draggable={false} />
      </button>

      {/* Icône niveau */}
      <img src={icon} alt={level} className="w-32 h-32 mt-10 mb-6" />

      <div className="text-center">
        <div className="text-3xl font-bold mb-2">
          Score : <span className="text-blue-600">{score} / {total}</span>
        </div>
        <div className="text-lg font-medium text-gray-700 mb-4">{message}</div>
      </div>

      {/* Boutons principaux */}
      <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
        <button
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition"
          onClick={onReplay}
        >
          Rejouer
        </button>
        <button
          className="w-full py-3 rounded-xl bg-gray-100 text-blue-700 font-bold text-lg border border-blue-200 hover:bg-blue-50 transition"
          onClick={onShowLeaderboard}
        >
          Voir le classement
        </button>
        <button
          className="w-full py-3 rounded-xl bg-yellow-100 text-yellow-700 font-bold text-lg border border-yellow-200 hover:bg-yellow-200 transition"
          onClick={openNews}
        >
          News Bourse 📰
        </button>
        {/* Bouton Buy Me a Coffee */}
        <button
          className="w-full py-3 rounded-xl bg-orange-100 text-orange-900 font-bold text-lg border border-orange-200 hover:bg-orange-200 transition flex items-center justify-center gap-2"
          onClick={() => window.open("https://buymeacoffee.com/lescarnetsduo", "_blank")}
        >
          <span role="img" aria-label="Café">☕</span>
          Soutiens le projet
        </button>
      </div>
    </div>
  );
}