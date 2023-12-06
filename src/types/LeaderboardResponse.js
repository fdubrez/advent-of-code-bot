/**
 * Représente la réponse de l'appel à l'API du leaderboard Adveng of Code
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
 */
