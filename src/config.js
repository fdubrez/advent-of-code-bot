const config = require("../config.json")

/**
 * App configuration
 * @typedef {{
 * 'adventOfCode': {
 *   'cookie': `session=${String}`,
 *   'leaderboard': Number,
 *   'year': Number
 * },
 * 'slack': {
 *   'channelId': String,
 *   'token': `xoxb-${Number}-${Number}-${String}`,
 *   'incomingWebHookId': `${String}/${String}/${String}`
 * },
 * 'sound': Boolean
 * }}
 */
module.exports = config;