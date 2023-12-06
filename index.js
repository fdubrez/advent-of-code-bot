const slack = require('./src/slack');
const adventOfCode = require('./src/adventofcode');
const quotes = require('./src/quotes');
const audio = require('./src/audio');
const path = require('path');
const fs = require('fs');

const MEDIA_PATH = path.join(process.cwd(), './src/media');
const state = require('./state.json');

/** @type {Config} */
const config = require('./src/config');
/** @type {LeaderboardResponse} */
let lastResponse = null;
/** @type {LeaderboardEntry[]} */
let previousData = null;
/** @type {LeaderboardEntry[]} */
let actualData = null;

/**
 * Converti le JSON de l'API Advent of Code en un tableau d'objets
 * @param {LeaderboardResponse} json
 * @returns {LeaderboardEntry[]}
 */
function compute(json) {
    return Object.keys(json.members).map((key) => {
        const member = json.members[key];
        const stars = Object.keys(member.completion_day_level).reduce((acc, day) => {
            acc[day] = Object.keys(member.completion_day_level[day]).reduce((dayStars, star) => {
                dayStars[`star_${star}`] = member.completion_day_level[day][star].get_star_ts;
                return dayStars;
            }, {});
            return acc;
        }, {});

        return {
            name: member.name,
            score: member.local_score,
            total_stars: member.stars,
            stars
        };
    });
}

/**
 * Trouve et retourne les différences entre deux entrées du leaderboard
 * @param {LeaderboardEntry} before
 * @param {LeaderboardEntry} after
 * @returns {LeaderboardEntryDifferences}
 */
function findChanges(before, after) {
    const changes = {};
    Object.keys(after.stars).forEach((day) => {
        if (!before.stars[day] || JSON.stringify(before.stars[day]) !== JSON.stringify(after.stars[day])) {
            changes[day] = after.stars[day];
        }
    });
    return changes;
}

async function main() {
    const json = process.env.NODE_ENV === 'dev' ? state : await adventOfCode.getLeaderBoard();
    lastResponse = json;
    actualData = compute(json);
    // au premier passage on prend les données du bouchon
    if (previousData === null) {
        const stateFile = path.join(process.cwd(), './state.json');
        if (fs.existsSync(stateFile)) {
            previousData = compute(require('./state.json'));
        } else {
            previousData = actualData;
        }
    }

    actualData.forEach((actual) => {
        if (previousData.some((previous) => previous.name === actual.name && previous.total_stars < actual.total_stars)) {
            const previous = previousData.filter((x) => x.name === actual.name)[0];
            const text = quotes.generateTextMessage(
                actual.name,
                actual.total_stars - previous.total_stars,
                findChanges(previous, actual),
                `Score: ${actual.score}(+${actual.score - previous.score})`
            );
            if (config.slack) {
                slack.sendMessage(text);
            }
            if (config.sound) {
                audio.play(`${MEDIA_PATH}/dj-horn.mp3`);
            }
        }
    });

    previousData = actualData;

    console.log('sleeping 15 min ...');
    // 900 seconds as asked in their term of use
    setTimeout(main, 15 * 60 * 1000);
}

const gracefullShutdown = () => {
    console.log('\nSaving actual state to ./state.json');
    require('fs').writeFileSync(__dirname + '/' + 'state.json', JSON.stringify(lastResponse));
    process.exit(0);
};

//catches ctrl+c event
process.on('SIGINT', gracefullShutdown);
process.on('SIGTERM', gracefullShutdown);

// Run main function
main();
