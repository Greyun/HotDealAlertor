const Slack = require('slack-node');

const webhookUri = 'ENTER_YOUR_WEBHOOKURI';

const slack = new Slack();
slack.setWebhook(webhookUri);

const send = async(message) => {
  slack.webhook({
    channel: "#CHANNEL",
    username: "USER_NAME",
    text: message
  }, function(err, res) {
    console.log(res);
  });
};

module.exports = {send};
