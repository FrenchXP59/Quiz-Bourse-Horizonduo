import React from "react";

export default function ModalLeaderboard({ open, onClose }) {
  if (!open) return null;

  // Récupération des scores en localStorage
  const bestScore = localStorage.getItem("bestScore") || "-";
  const bestDate = localStorage.getItem("bestDate") || "-";
  const lastScore = localStorage.getItem("lastScore") || "-";
  const lastDate = localStorage.getItem("lastDate") || "-";

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
          <div><b>Meilleur score :</b> {bestScore} ({bestDate})</div>
          <div className="mt-2"><b>Dernier score :</b> {lastScore} ({lastDate})</div>
        </div>
      </div>
    </div>
  );
}