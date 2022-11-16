const https = require("https")
const config = require("./config")

/**
 * @typedef {{
 * [day: string]: {
 *   [part: string]: {
 *     'get_star_ts': Number,
 *     'star_index': Number,
 *   }
 * }
 * }} CompletionDayLevel
 * @typedef {{
 * 'members': {
 *   [key: string]: {
 *     'completion_day_level': CompletionDayLevel,
 *     'local_score': Number,
 *     'global_score': Number,
 *     'stars': Number,
 *     'last_star_ts': Number,
 *     'id': Number,
 *     'name': String
 *   },
 * }
 * }} LeaderboardResponse
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
        resolve(JSON.parse(response.toString("utf-8")));
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
