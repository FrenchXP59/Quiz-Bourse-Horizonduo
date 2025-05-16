import React, { useState } from "react";
import { badgesData } from "../data/badgesData"; // Chemin à adapter selon ton projet

// Composant badges AVEC tooltip
function BadgesSection({ stats }) {
  // Un seul état pour l’index du badge survolé/touché
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        <span role="img" aria-label="Badge">🏅</span> Badges débloqués
      </h3>
      <div className="flex gap-4 flex-wrap justify-center">
        {badgesData.map((badge, idx) => {
          const unlocked = badge.condition(stats);

          return (
            <div
              key={badge.id}
              className="flex flex-col items-center relative"
              // Hover desktop
              onMouseEnter={() => setTooltip(idx)}
              onMouseLeave={() => setTooltip(null)}
              // Tap mobile
              onTouchStart={() => setTooltip(tooltip === idx ? null : idx)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={badge.img}
                alt={badge.name}
                className={unlocked ? "w-14 h-14" : "w-14 h-14 opacity-40 grayscale"}
                draggable={false}
              />
              <span className="text-xs mt-1 text-center">{badge.name}</span>
              {/* Tooltip custom */}
              {tooltip === idx && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap">
                  {badge.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ModalLeaderboard({ open, onClose }) {
  if (!open) return null;

  // Récupération des stats en localStorage
  const stats = JSON.parse(localStorage.getItem("quizStats") || "{}");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[320px] max-w-xs relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-2xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">🏆 Classement local</h2>
        <div className="text-lg mb-3">
          <div><b>Meilleur score :</b> {stats.bestScore || "-"} </div>
          <div><b>Meilleur score (%) :</b> {stats.bestScorePct ? `${Math.round(stats.bestScorePct)}%` : "-"}</div>
          <div className="mt-2"><b>Dernier score :</b> {stats.lastScore || "-"} </div>
          <div><b>Nombre de parties :</b> {stats.totalGames || 0}</div>
        </div>
        {/* Section Badges avec tooltip */}
        <BadgesSection stats={stats} />
      </div>
    </div>
  );
}