const https = require("https");
const { App } = require("@slack/bolt");
const { createReceiver } = require("./receiver");
const registerHandlers = require("./handlers");

exports.getReceiver = ({ logger }) => {
  return createReceiver({
    logger,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  });
};

exports.createSlackApp = ({ logger, receiver }) => {
  const app = new App({
    logger,
    receiver,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  });

  app.error(error => {
    // Check the details of the error to handle cases where you should retry sending a message or stop the app
    console.error(error, JSON.stringify(error && error.data));
  });

  registerHandlers(app);
};
