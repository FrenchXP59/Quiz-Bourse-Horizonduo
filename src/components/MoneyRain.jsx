import React from "react";

const billets = [
  "/assets/icons/bill1.png",
  "/assets/icons/bill2.png",
  "/assets/icons/bill3.png", // Utilise 2-3 images différentes pour le réalisme
];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

export default function MoneyRain({ count = 16 }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {Array.from({ length: count }).map((_, i) => {
        const left = randomBetween(5, 95);
        const delay = randomBetween(0, 2);
        const duration = randomBetween(3, 6);
        const size = randomBetween(32, 60);
        const billet = billets[i % billets.length];
        return (
          <img
            key={i}
            src={billet}
            alt=""
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-80px',
              width: `${size}px`,
              height: 'auto',
              opacity: 0.85,
              animation: `money-fall ${duration}s ${delay}s linear infinite`,
              zIndex: 1,
              pointerEvents: "none"
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
}