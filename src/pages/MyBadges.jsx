import React from "react";
import { useNavigate } from "react-router-dom";
import { badgesData } from "../data/badgesData";

function MyBadges() {
  const navigate = useNavigate();
  // On récupère les badges gagnés en localStorage
  const stats = JSON.parse(localStorage.getItem("quizStats") || "{}");
  const unlocked = stats.badgesUnlocked || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe8] via-[#f9fafb] to-[#f5e6c4] flex flex-col items-center px-4 py-8">
      {/* SEO title pour accessibilité */}
      <title>Mes Badges – Quiz Bourse</title>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
        🏅 Mes Badges
      </h1>
      <p className="mb-6 text-gray-700 text-center max-w-md">
        Collectionne tous les badges en relevant les défis du Quiz Bourse.<br />
        Découvre comment les débloquer !
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {badgesData.map(badge => {
          const isUnlocked = unlocked.includes(badge.id);
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center bg-white/90 rounded-xl shadow p-4 min-w-[120px] max-w-[140px] relative transition"
              style={{
                boxShadow: isUnlocked
                  ? "0 0 16px 4px gold"
                  : "0 0 4px 1px #e2e8f0",
                opacity: isUnlocked ? 1 : 0.4,
                filter: isUnlocked ? "none" : "grayscale(1)",
              }}
            >
              <img
                src={badge.img}
                alt={badge.name}
                className="w-14 h-14"
                draggable={false}
              />
              <div
                className={
                  "mt-2 font-bold text-center " +
                  (isUnlocked ? "text-yellow-700" : "text-gray-400")
                }
              >
                {badge.name}
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">
                {badge.description}
              </div>
              {/* Affiche l’étoile animée si débloqué */}
              {isUnlocked && (
                <span className="absolute top-1 right-2 text-lg animate-pop-badge" title="Débloqué">
                  ⭐
                </span>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
      >
        Retour
      </button>
    </div>
  );
}

export default MyBadges;