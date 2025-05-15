// src/components/Home.jsx
import React from "react";

export default function Home({ onStart }) {
  return (
    <div
      className="
        fixed inset-0
        w-screen h-screen
        bg-[url('/assets/icons/wall_street_bg.webp')]
        bg-cover bg-center bg-no-repeat

        flex flex-col items-center justify-between
        px-4 py-8                 /* petits paddings horizontaux & verticaux */
      "
    >
      {/* 1) Le titre en haut */}
      <h1 className="
          text-3xl md:text-4xl lg:text-5xl
          font-bold text-white
          drop-shadow-lg             /* pour le faire ressortir sur l'image */
          text-center
        ">
        Quiz Bourse
      </h1>

      {/* 2) Le bouton Entrer en bas */}
      <button
        onClick={onStart}
        className="
          relative z-10
          bg-transparent border-none p-0 focus:outline-none
          mb-4                       /* marge inférieure */
        "
      >
        <img
          src="/assets/icons/enter_button.png"
          alt="Entrer"
          className="
            w-20 sm:w-24 md:w-28 lg:w-32
            h-auto
          "
        />
      </button>
    </div>
  );
}