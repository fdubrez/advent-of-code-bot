advent-of-code-bot
==================

A NodeJS bot that crawl Advent of Code API to retrieve leaderboard changes and publish messages in a slack channel.

## Getting started

Create a `config.json` file that fit your needs.

```json
{
    "adventOfCode": {
        "cookie": "session=<your_cookie>", 
        "leaderboard": "<leaderboard_id>",
        "year": 2022
    },
    "slack": {
        "channelId": <slack_channel_id>,
        "token": <slack_token>,
        "incomingWebHookId" : <incoming_webhook_id>
    },
    "sound": false // set to true if you want to play sound 😎
}
```

Leaderboard id could be found here: https://adventofcode.com/2022/leaderboard/private

The app use a Slack incoming web hook that you must create: https://api.slack.com/messaging/webhooks

Just start the app using `node index.js`

Run `npm install` to get type hints from Node 
