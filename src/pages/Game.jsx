import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadQuizBalanced, allLots } from "../data";

export default function Game() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let selectedLots = Object.keys(allLots);
    let count = 20;

    console.log("📌 Mode sélectionné :", mode);

    if (mode === "random40") count = 40;

    if (mode === "byCategory") {
      const cat = searchParams.get("cat");
      const categoryMap = {
        cultureg: ["lot6_art", "lot10_langue", "lot14_mixte"],
        histoire: ["lot2_histoire", "lot7_institutions", "lot8_actuEurope"],
        monde: ["lot3_science", "lot4_geo", "lot9_climat"], // 🔄 Vérifie bien les noms ici
        sciences: ["lot5_techno", "lot11_sante", "lot12_maths"],
        societe: ["lot1_litterature", "lot13_economie"],
        jeunesse: ["lot15_bd", "lot99_jeuxvideo"],
      };
      selectedLots = categoryMap[cat] || [];
      console.log("📚 Catégorie choisie :", cat, selectedLots);
    }

    if (mode === "byDifficulty") {
      const level = searchParams.get("level"); // "facile", "moyen", "difficile"
      const allQuestions = Object.values(allLots).flat();
      const filtered = allQuestions.filter((q) => q.difficulty === level);
      console.log("🎯 Niveau de difficulté :", level);
      console.log("🔎 Questions trouvées :", filtered.length);
      console.log(filtered);

      const limited = filtered.sort(() => Math.random() - 0.5).slice(0, 20);

      const quiz = limited.map((q) => {
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        return {
          ...q,
          options: shuffledOptions,
          answerIndex: shuffledOptions.indexOf(q.answer),
        };
      });

      setQuestions(quiz);
      setStartTime(Date.now());
      return; // ⛔️ Ne pas exécuter loadQuizBalanced
    }

    const quiz = loadQuizBalanced(selectedLots, count);
    console.log("🧪 Quiz généré avec", selectedLots.length, "lots pour", count, "questions.");
    setQuestions(quiz);
    setStartTime(Date.now());
  }, [mode, searchParams]);

  const handleAnswer = (choice) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    const current = questions[currentIndex];
    if (choice === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  if (questions.length === 0) return <p className="p-4">Chargement...</p>;

  if (currentIndex >= questions.length) {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz terminé</h2>
        <p className="mb-2">
          Score : <strong>{score} / {questions.length}</strong>
        </p>
        <p className="mb-6">
          Temps écoulé : <strong>{totalTime} sec</strong>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-pastel-blue text-gray-900 font-semibold rounded-xl hover:scale-105 transition"
        >
          🔄 Rejouer
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        Question {currentIndex + 1} / {questions.length}
      </h2>
      <p className="font-bold mb-4">{q.question}</p>
      <ul className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = selectedAnswer !== null && opt === q.answer;
          const isWrong = selectedAnswer === opt && opt !== q.answer;
          return (
            <li
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`
                px-4 py-2 rounded-lg shadow cursor-pointer
                transition
                ${selectedAnswer === null ? "bg-white hover:bg-pastel-blue" : ""}
                ${isCorrect ? "bg-green-300 font-bold" : ""}
                ${isWrong ? "bg-red-300" : ""}
              `}
            >
              {opt}
            </li>
          );
        })}
      </ul>
      {selectedAnswer !== null && q.explanation && (
        <div className="mt-5 px-4 py-3 bg-blue-50 border-l-4 border-blue-300 rounded shadow text-sm text-gray-800">
          💡 <strong>Explication :</strong> {q.explanation}
        </div>
      )}
      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-2 bg-pastel-violet text-gray-900 font-semibold rounded-xl hover:scale-105 transition"
        >
          Question suivante →
        </button>
      )}
    </div>
  );
}