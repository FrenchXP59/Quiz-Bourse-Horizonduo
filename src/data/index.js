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
 * Tire un quiz équilibré par lot (thème).
 * @param {string[]} selectedLots - lots à inclure (ex: ['lot1_instruments', ...])
 * @param {number} totalCount - nombre total de questions à tirer
 * @returns {Array} - tableau de questions mélangées et préparées
 */
export function loadQuizBalanced(selectedLots = Object.keys(allLots), totalCount = 10) {
  // 1. On prépare un pool de questions par lot (thème)
  const pools = selectedLots.map(key => shuffleArray(allLots[key] || []));
  const nbThemes = pools.length;
  const perTheme = Math.floor(totalCount / nbThemes);

  let result = [];
  // 2. Pour chaque thème, on en prend perTheme (si possible)
  pools.forEach(pool => {
    result = result.concat(pool.slice(0, perTheme));
  });

  // 3. Complète pour arriver à totalCount (pioche dans le reste)
  let allQuestions = pools.flat().filter(q => !result.includes(q));
  allQuestions = shuffleArray(allQuestions);
  let i = 0;
  while (result.length < totalCount && i < allQuestions.length) {
    result.push(allQuestions[i]);
    i++;
  }

  // 4. Mélange final + options des QCM et answerIndex
  return shuffleArray(result).map(q => {
    const shuffled = shuffleArray(q.options);
    return {
      ...q,
      options: shuffled,
      answerIndex: shuffled.indexOf(q.answer)
    };
  });
}


