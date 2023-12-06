advent-of-code-bot
==================

A NodeJS bot that crawl Advent of Code API to retrieve leaderboard changes and publish messages in a Slack channel.

## Getting started

Create a `config.json` file that fit your needs.

```js
{
    "adventOfCode": {
        "cookie": "session=<your_cookie>", 
        "leaderboard": "<leaderboard_id>",
        "year": 2023
    },
    "slack": {
        "channelId": "<slack_channel_id>",
        "token": "<slack_token>",
        "incomingWebHookId" : "<incoming_webhook_id>"
    },
    "sound": false // set to true if you want to play sound 😎
}
```

Leaderboard ID can be found here: https://adventofcode.com/2023/leaderboard/private

The app use a Slack incoming webhook that you must create: https://api.slack.com/messaging/webhooks

Just start the app using `node index.js`

Run `npm install` to get type hints from Node 
