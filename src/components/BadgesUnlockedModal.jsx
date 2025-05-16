import React from "react";

// Animation de halo et éclats autour du badge
function GlowStars() {
  return (
    <>
      {/* Halo doré */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="animate-glow rounded-full"
          style={{
            width: "100px",
            height: "100px",
            background: "radial-gradient(circle, #ffe066 30%, #ffd70022 70%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />
      </div>
      {/* Quelques étoiles/éclats */}
      <span className="absolute left-3 top-7 text-yellow-400 text-xl animate-star">✨</span>
      <span className="absolute right-4 top-3 text-yellow-300 text-lg animate-star2">✴️</span>
      <span className="absolute left-10 bottom-3 text-yellow-200 text-base animate-star3">⭐</span>
      <span className="absolute right-7 bottom-7 text-yellow-400 text-sm animate-star4">✨</span>
    </>
  );
}

export default function BadgesUnlockedModal({ badges = [], onClose }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 min-w-[320px] max-w-sm flex flex-col items-center relative overflow-visible animate-pop">
        <h2 className="text-2xl font-extrabold text-yellow-700 mb-2 animate-text-pop">
          🎉 Bravo !
        </h2>
        <div className="mb-1 text-lg font-semibold text-gray-700">
          Tu as débloqué {badges.length > 1 ? "des badges" : "un badge"} !
        </div>
        <div className="flex gap-6 my-4">
          {badges.map((b, i) => (
            <div key={b.id} className="relative flex flex-col items-center">
              <GlowStars />
              <img
                src={b.img}
                alt={b.name}
                className="w-20 h-20 z-10 relative animate-badge-pop"
                style={{ filter: "drop-shadow(0 0 12px #ffd700cc)" }}
                draggable={false}
              />
              <div className="text-base font-bold text-yellow-700 mt-2">{b.name}</div>
              <div className="text-xs text-gray-600 font-medium text-center max-w-[110px]">
                {b.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 text-gray-800 text-center font-medium animate-text-pop2">
          {badges.length > 1 ? "Félicitations pour ces nouveaux succès !" : "Félicitations !"}
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-8 py-2 rounded-xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}