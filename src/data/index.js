// src/data/index.js

import { lot1_litterature } from "./lot1_litterature";
import { lot2_histoire } from "./lot2_histoire";
import { lot3_science } from "./lot3_science";
import { lot4_geo } from "./lot4_geo";
import { lot5_techno } from "./lot5_techno";
import { lot6_art } from "./lot6_art";
import { lot7_societe } from "./lot7_societe";
import { lot8_actuEurope } from "./lot8_actuEurope";
import { lot9_climat } from "./lot9_climat";
import { lot10_langue } from "./lot10_langue";
import { lot11_sante } from "./lot11_sante";
import { lot12_maths } from "./lot12_maths";
import { lot13_economie } from "./lot13_economie";
import { lot14_mixte } from "./lot14_mixte";
import { lot15_bd } from "./lot15_bd";
import { lot99_jeuxvideo } from "./lot99_jeuxvideo";

export const allLots = {
  lot1_litterature,
  lot2_histoire,
  lot3_science,
  lot4_geo,
  lot5_techno,
  lot6_art,
  lot7_societe,
  lot8_actuEurope,
  lot9_climat,
  lot10_langue,
  lot11_sante,
  lot12_maths,
  lot13_economie,
  lot14_mixte,
  lot15_bd,
  lot99_jeuxvideo,
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
 * @param {string[]} selectedLots - lots à inclure (ex: ['lot1_litterature', ...])
 * @param {number} totalCount - nombre total de questions à tirer
 * @returns {Array} - tableau de questions mélangées et préparées
 */
export function loadQuizBalanced(selectedLots = Object.keys(allLots), totalCount = 10) {
  const pools = selectedLots.map(key => shuffleArray(allLots[key] || []));
  const nbThemes = pools.length;
  const perTheme = Math.floor(totalCount / nbThemes);

  let result = [];
  pools.forEach(pool => {
    result = result.concat(pool.slice(0, perTheme));
  });

  let allQuestions = pools.flat().filter(q => !result.includes(q));
  allQuestions = shuffleArray(allQuestions);
  let i = 0;
  while (result.length < totalCount && i < allQuestions.length) {
    result.push(allQuestions[i]);
    i++;
  }

  return shuffleArray(result).map(q => {
    const shuffled = shuffleArray(q.options);
    return {
      ...q,
      options: shuffled,
      answerIndex: shuffled.indexOf(q.answer)
    };
  });
}