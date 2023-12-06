const etats = ["Ivre", "Crevé", "Sous l'emprise de la drogue", "Assoiffé", "Affamé", "Sirotant son thé au Yuzu", "Mangeant ses chocapics", "Buvant sa meilleure bière"];
const adjectifs = ["déterminé", "désabusé", "tout émoustillé", "anxieux", "fier", "héroïque", "désespéré", "après en avoir chié un max"];
const punchlines = [
    "s'empare de XXX étoile(s) 🌟 et s'en va comme un prince",
    "n'écoutant que son courage valide sa réponse et décroche XXX étoile(s) 🌟",
    "après un claquage de 3 neurones décroche XXX étoile(s) 🌟 supplémentaire(s)",
    "laisse tomber le TDD mais décroche quand même XXX étoile(s) 🌟 avec style",
    "avait envisagé de le tenter en assembleur mais en fait non. XXX étoile(s) 🌟 dans la poche",
    "pensait utiliser un réseau de neurone pour résoudre le problème, mais en fait c'est quoi un réseau de neurone ?!? OSEF XXX étoile(s) 🌟 dans la poche",
    "pensait aller se mater la rediff de miss France mais non, retourne coder et décroche XXX étoiles(s) 🌟",
    "le cerveau en semoule chope XXX étoile(s) 🌟 et file s'ouvrir une bière de seigneur",
    "soulève XXX étoile(s) 🌟 et part à la salle sûr de pouvoir soulever 20 kg de plus qu'hier"
]

/**
 * Pretty prints the leaderboard entry differences.
 * @param {LeaderboardEntryDifferences} differences
 * @returns {string} The pretty-printed string.
 */
function prettyPrintDifferences(differences) {
    let result = "";
    Object.keys(differences).forEach(day => {
      const stars = Object.keys(differences[day]).map(_ => '⭐');
      result += `Jour ${day} : ${stars}\n`;
    });
    return result.trim();
  }

/**
 * Génère un message aléatoire à partir du nom du joueur, du nombre d'étoiles gagnées et du score
 * @param {string} name - player name
 * @param {number} starsCount - player stars count earned since last update
 * @param {LeaderboardEntryDifferences} differences - differences between the previous and actual stars
 * @param {string} score - player score
 * @returns the generated message
 */
function generateTextMessage(name, starsCount, differences, score) {
    const etat = etats[Math.floor(Math.random() * etats.length)]
    const adjectif = adjectifs[Math.floor(Math.random() * adjectifs.length)]
    const punchline = punchlines[Math.floor(Math.random() * punchlines.length)]
    return `${etat} et ${adjectif}, *${name}* ${punchline} :
${prettyPrintDifferences(differences)}
\`${score}\``.replace("XXX", '' + starsCount);
}

module.exports = {
    generateTextMessage
}