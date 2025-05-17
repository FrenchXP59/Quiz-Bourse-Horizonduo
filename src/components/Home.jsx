import React from "react";
import { useNavigate } from "react-router-dom";
// 1. On importe l'image
import enterBtn from "../assets/icons/enter_button.png";

export default function Home({ onStart }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed inset-0
        w-screen h-screen
        bg-[url('/assets/backgrounds/bg_cultureg.webp')]
        bg-cover bg-center bg-no-repeat
        flex flex-col items-center justify-between
        px-4 pt-10 pb-8
        pb-[env(safe-area-inset-bottom)]
      "
    >
      {/* Titre principal */}
      <div className="w-full flex flex-col items-center mt-2">
        <h1 className="
          text-4xl md:text-5xl lg:text-6xl
          font-extrabold
          text-white
          drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]
          text-center
          px-4 py-2
          bg-black/20
          rounded-xl
        ">
          Quiz Culture G
          <span className="text-sm font-light block mt-1">De Baby à Master</span>
        </h1>
      </div>

      {/* Vide pour centrer */}
      <div className="flex-1 flex flex-col items-center justify-center w-full" />

      {/* Bouton ENTER via import */}
      <button
        onClick={onStart}
        className="
          relative z-10 mt-auto animate-pulse
          focus:outline-none
          flex items-center justify-center
          transition-all active:scale-95
        "
        aria-label="Entrer"
      >
        <img
          src={enterBtn}                   // ← ici on utilise l’import
          alt="Entrer"
          className="
            w-28 md:w-36 lg:w-44
            h-auto
            drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]
            transition-transform
            hover:scale-110 hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]
            cursor-pointer
          "
        />
      </button>

      {/* Bouton Mes badges */}
      <button
        onClick={() => navigate("/mybadges")}
        className="
          mt-8 px-6 py-2 rounded-xl bg-pastel-rose text-gray-800 font-bold
          shadow hover:bg-pastel-violet hover:scale-105 transition
          text-base md:text-lg
        "
      >
        Voir mes badges
      </button>
    </div>
  );
}