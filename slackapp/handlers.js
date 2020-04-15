module.exports = app => {
  app.message(":wave:", async ({ message, say }) => {
    await say(`Hello, <@${message.user}>`);
  });

  app.command('/break', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();

    await say(`Enjoy your ${command.text} break`);
  });

};
