// src/data/index.js

import { lot1_instruments } from "./lot1_instruments";
import { lot2_actions } from "./lot2_actions";
import { lot3_fiscalite } from "./lot3_fiscalite";
import { lot4_analyse_fondamentale } from "./lot4_analyse_fondamentale";
import { lot5_analyse_technique } from "./lot5_analyse_technique";
import { lot6_strategies } from "./lot6_strategies";
import { lot7_psychologie } from "./lot7_psychologie";
import { lot8_culture_boursiere } from "./lot8_culture_boursiere";
import { lot9_profils } from "./lot9_profils";
import { lot10_trading } from "./lot10_trading";
import { lot11_crypto } from "./lot11_crypto";
import { lot12_epargne } from "./lot12_epargne";
import { lot13_marche } from "./lot13_marche";
import { lot14_saisonnalite } from "./lot14_saisonnalite";
import { lot15_risque } from "./lot15_risque";
import { lot99_autres } from "./lot99_autres";

export const allLots = {
  lot1_instruments,
  lot2_actions,
  lot3_fiscalite,
  lot4_analyse_fondamentale,
  lot5_analyse_technique,
  lot6_strategies,
  lot7_psychologie,
  lot8_culture_boursiere,
  lot9_profils,
  lot10_trading,
  lot11_crypto,
  lot12_epargne,
  lot13_marche,
  lot14_saisonnalite,
  lot15_risque,
  lot99_autres,
};

/**
 * Shuffle un tableau.
 * @param {Array} arr
 * @returns {Array}
 */
function shuffleArray(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/**
 * Charge et prépare le quiz à partir des lots sélectionnés.
 * @param {string[]} selectedLots - clés du allLots à inclure (ex: ['lot1_instruments','lot12_epargne'])
 * @returns {Array} - tableau de questions avec options mélangées et answerIndex calculé
 */
export function loadQuiz(selectedLots = Object.keys(allLots)) {
  // 1. Concatène toutes les questions des lots choisis
  const pool = selectedLots.flatMap(key => allLots[key] || []);

  // 2. Shuffle des options et calcul de answerIndex
  return pool.map(q => {
    const shuffled = shuffleArray(q.options);
    return {
      ...q,
      options: shuffled,
      answerIndex: shuffled.indexOf(q.answer)
    };
  });
}

