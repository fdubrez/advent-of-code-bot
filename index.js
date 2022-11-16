const slack = require("./src/slack")
const adventOfCode = require("./src/adventofcode")
const quotes = require("./src/quotes")

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

async function main() {
    const json = await adventOfCode.getLeaderBoard();
    actualData = compute(json)
    // au premier passage on prend les données du bouchon de ce matin
    if (previousData === null) {
        previousData = compute(actualData)
    }

    actualData.forEach(actual => {
        if (previousData.some(previous => previous.name === actual.name && previous.stars < actual.stars)) {
            const previous = previousData.filter(x => x.name === actual.name)[0];
            const text = quotes.generateTextMessage(actual.name, (actual.stars - previous.stars), `Score: ${actual.score}(+${actual.score - previous.score})`)
            slack.sendMessage(text);
        }
    })

    previousData = actualData;

    console.log("sleeping 15 min ...")
    // 900 seconds as asked in their term of use
    setTimeout(main, 15 * 60 * 1000);
}

const gracefullStop = () => {
    console.log("\nSaving actual state to ./state.json");
    require("fs").writeFileSync(__dirname + "/" + "state.json", JSON.stringify(lastResponse))
    process.exit(0);
}

// Perform a gracefull stop on CTRL + C or CTRL + D events or Kill signals
process.on("SIGINT", gracefullStop)
process.on("SIGKILL", gracefullStop)

// Run main function
main()