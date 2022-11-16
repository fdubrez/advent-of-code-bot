const https = require("https")
const config = require("./config")

/**
 * Post message to slack and returns raw JSON response.
 * 
 * @param {String} message 
 * @returns {Promise<String>}
 */
async function sendMessage(message) {
    const postData = JSON.stringify({
        text: message
    })
    const options = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: `/services/${config.slack.incomingWebHookId}`,
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${config.slack.token}`,
            "Content-Length": Buffer.byteLength(postData)
        }
    }
    return new Promise((resolve, reject) => {
        var req = https.request(options, (res) => {
            console.log(`POST https://${options.hostname}${options.path} ${res.statusCode}`);
            res.setEncoding('utf8');
            
            let response = ''
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                resolve(response)
            });
        });
          
        req.on('error', (e) => {
            reject(e)
        });
          
        // write data to request body
        req.write(postData);
        req.end();
    }).catch(err => {
        console.error(err.message, err)
    })
}

module.exports = {
    sendMessage
}