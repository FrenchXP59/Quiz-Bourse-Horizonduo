// src/components/ScoreBoard.jsx
import React from "react";

export default function ScoreBoard({ score, total, onReplay }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-4">
        Votre score : {score} / {total}
      </h2>
      <button
        onClick={onReplay}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Rejouer
      </button>
    </div>
  );
}