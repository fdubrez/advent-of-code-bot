const slack = require("./src/slack")
const adventOfCode = require("./src/adventofcode")
const quotes = require("./src/quotes")
const audio = require("./src/audio")
const path = require("path")
const config = require("./src/config")
const fs = require("fs")

let previousData = null
let lastResponse = null
let actualData = null

function compute(leaderboardJsonResponse) {
    return Object.keys(leaderboardJsonResponse.members)
        .map(key => {
            const member = leaderboardJsonResponse.members[key];
            return {
                stars: member.stars,
                name: member.name,
                score: member.local_score
            }
        })
}

const MEDIA_PATH = path.join(process.cwd(), './src/media');

async function main() {
    const json = await adventOfCode.getLeaderBoard();
    lastResponse = json
    actualData = compute(json)
    // au premier passage on prend les données du bouchon de ce matin
    if (previousData === null) {
        const stateFile = path.join(process.cwd(), './state.json')
        if (fs.existsSync(stateFile)) {
            previousData = compute(require("./state.json"))
        } else {
            previousData = actualData
        }
    }

    actualData.forEach(actual => {
        if (previousData.some(previous => previous.name === actual.name && previous.stars < actual.stars)) {
            const previous = previousData.filter(x => x.name === actual.name)[0];
            const text = quotes.generateTextMessage(actual.name, (actual.stars - previous.stars), `Score: ${actual.score}(+${actual.score - previous.score})`)
            slack.sendMessage(text);
            if (config.sound) {
                audio.play(`${MEDIA_PATH}/dj-horn.mp3`);
            }
        }
    })

    previousData = actualData;

    console.log("sleeping 15 min ...")
    // 900 seconds as asked in their term of use
    setTimeout(main, 15 * 60 * 1000);
}

const gracefullShutdown = () => {
    console.log("\nSaving actual state to ./state.json");
    require("fs").writeFileSync(__dirname + "/" + "state.json", JSON.stringify(lastResponse))
    process.exit(0);
}

//catches ctrl+c event
process.on('SIGINT', gracefullShutdown);
process.on('SIGTERM', gracefullShutdown);

// Run main function
main()