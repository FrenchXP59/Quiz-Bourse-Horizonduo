import badgeStart from "../assets/badges/badge_start.png";
import badgeRunner from "../assets/badges/badge_runner.png";
import badgeTarget from "../assets/badges/badge_target.png";
import badgePro from "../assets/badges/badge_pro.png";
import badgeMedal from "../assets/badges/badge_medal.png";

export const badgesData = [
  {
    id: "start",
    img: badgeStart,
    name: "Premier pas",
    description: "Joue ta première partie",
    condition: (stats) => stats.totalGames >= 1,
  },
  {
    id: "runner",
    img: badgeRunner,
    name: "Assidu",
    description: "Joue 10 parties",
    condition: (stats) => stats.totalGames >= 10,
  },
  {
    id: "target",
    img: badgeTarget,
    name: "Sniper",
    description: "Score parfait (100%) sur un quiz",
    condition: (stats) => stats.bestScorePct === 100,
  },
  {
    id: "pro",
    img: badgePro,
    name: "Expert",
    description: "Score ≥80% sur 5 parties",
    condition: (stats) => stats.highScoreGames >= 5,
  },
  {
    id: "medal",
    img: badgeMedal,
    name: "Champion",
    description: "Bats ton meilleur score",
    condition: (stats) => stats.hasBeatenBestScore,
  },
];