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

## systemd service example

```
# /etc/systemd/system/aoc-bot.service
[Unit]
Description="Advent of code bot"

[Service]
ExecStart=/usr/bin/node index.js
WorkingDirectory=/path/to/advent-of-code-bot
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=aoc-bot
Environment=

[Install]
WantedBy=multi-user.target
```

```shell
sudo systemctl enable advent-bot.service
sudo systemctl start advent-bot.service
sudo systemctl status advent-bot.service
● aoc-bot.service - "Advent of code bot"
     Loaded: loaded (/etc/systemd/system/aoc-bot.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-12-06 19:48:46 UTC; 51min ago
   Main PID: 32342 (node)
      Tasks: 11 (limit: 4288)
     Memory: 13.5M
     CGroup: /system.slice/aoc-bot.service
             └─32342 /usr/bin/node index.js

Dec 06 19:48:46 christmas-server systemd[1]: Started "Advent of code bot".
Dec 06 19:48:48 christmas-server aoc-bot[32342]: GET https://adventofcode.com/2023/leaderboard/private/view/MY_LEADERBOARD.json 200
Dec 06 19:48:48 christmas-server aoc-bot[32342]: sleeping 15 min ...
```
