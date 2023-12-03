module.exports = function(bot) {
    bot.on('chat', (username, message) => {
      if (message === '-test') {
        bot.chat(`/w ${username} &ltest returned &6&lsuccesfully&d&l!`);
      }
    });
  };
  