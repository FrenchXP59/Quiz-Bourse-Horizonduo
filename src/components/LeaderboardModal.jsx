import React from "react";

export default function LeaderboardModal({ open, onClose, stats }) {
  if (!open) return null;

  // Gestion de l’accessibilité clavier (fermeture avec ESC)
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 relative">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">🏆 Classement local</h2>
        <div className="mb-4 text-center space-y-2">
          <div>
            <span className="text-gray-500">Meilleur score :</span>
            <span className="ml-2 text-2xl font-bold text-green-600">{stats.bestScore ?? "-"}</span>
            <span className="block text-xs text-gray-400">{stats.bestDate ? `(le ${stats.bestDate})` : ""}</span>
          </div>
          <div>
            <span className="text-gray-500">Dernière partie :</span>
            <span className="ml-2 text-lg font-bold text-blue-600">{stats.lastScore ?? "-"}</span>
            <span className="block text-xs text-gray-400">{stats.lastDate ? `(le ${stats.lastDate})` : ""}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}