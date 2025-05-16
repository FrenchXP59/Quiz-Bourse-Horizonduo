// src/components/ScoreBoard.jsx
import React, { useEffect, useState } from "react";
import scoreLow from "../assets/icons/score_low.png";
import scoreMedium from "../assets/icons/score_medium.png";
import scoreHigh from "../assets/icons/score_high.png";
import backIcon from "../assets/icons/back.png";
import { badgesData } from "../data/badgesData";
import BadgesUnlockedModal from "./BadgesUnlockedModal"; // À créer

// Helper niveau/message/icône
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
  // 1. Sauvegarde des scores et stats globales
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

    // --- Stockage stats utilisateur global ---
    let stats = JSON.parse(localStorage.getItem("quizStats") || "{}");
    stats.totalGames = (stats.totalGames || 0) + 1;
    stats.bestScore = Math.max(score, stats.bestScore || 0);
    stats.bestScorePct = Math.max((score / total) * 100, stats.bestScorePct || 0);
    stats.highScoreGames = (stats.highScoreGames || 0) + ((score / total) >= 0.8 ? 1 : 0);
    stats.lastScore = score;
    stats.lastDate = now;
    localStorage.setItem("quizStats", JSON.stringify(stats));
  }, [score, total]);

  // 2. Gestion de la détection de nouveaux badges
  const [newBadges, setNewBadges] = useState([]);

  useEffect(() => {
    let stats = JSON.parse(localStorage.getItem("quizStats") || "{}");
    let prevBadges = stats.badgesUnlocked || [];
    const unlockedNow = badgesData.filter(b => b.condition(stats)).map(b => b.id);
    const newlyUnlocked = unlockedNow.filter(id => !prevBadges.includes(id));
    if (newlyUnlocked.length > 0) {
      setNewBadges(badgesData.filter(b => newlyUnlocked.includes(b.id)));
      localStorage.setItem(
        "quizStats",
        JSON.stringify({ ...stats, badgesUnlocked: unlockedNow })
      );
    }
  }, [score, total]);

  // 3. Ouvre la page News
  const openNews = () => {
    window.open("https://horizonduo.net/news/bourse", "_blank");
  };

  const { icon, message, level } = getScoreInfo(score, total);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4 relative">
        {/* Bouton retour (haut gauche) */}
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
        </div>
      </div>
      {/* Modale animation badge */}
      <BadgesUnlockedModal
        badges={newBadges}
        onClose={() => setNewBadges([])}
      />
    </>
  );
}