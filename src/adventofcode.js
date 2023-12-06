const https = require("https");
const config = require("./config");

/**
 * Récupère l'état du leaderboard via l'API Advent of Code
 * @returns {Promise<LeaderboardResponse>} the JSON response of the Leaderboard API
 */
async function getLeaderBoard() {
  const options = {
    hostname: "adventofcode.com",
    port: 443,
    path: `/${config.adventOfCode.year}/leaderboard/private/view/${config.adventOfCode.leaderboard}.json`,
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: `${config.adventOfCode.cookie}`,
    },
  };
  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      console.log(
        `GET https://${options.hostname}${options.path} ${res.statusCode}`
      );

      let response = "";
      res.on("data", (chunk) => {
        response += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(response.toString()));
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
  }).catch((err) => {
    console.error(err.message, err);
  });
}

module.exports = {
  getLeaderBoard,
};
