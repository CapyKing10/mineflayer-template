const mineflayer = require('mineflayer');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const path = require('path');

const bot = mineflayer.createBot({
  host: config.ip,
  port: config.port,
  username: config.username,
  skipValidation: true,
});

function loadCommands() {
    const commandsFolder = './commands';
  
    if (bot.commandsLoaded) {
      return;
    }
  
    fs.readdir(commandsFolder, (err, files) => {
      if (err) {
        console.error('Error reading commands folder:', err);
        return;
      }
  
      files
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
          const filePath = path.resolve(__dirname, commandsFolder, file);
  
          try {
            const commandFunction = require(filePath);
  
            commandFunction(bot);
          } catch (error) {
            console.error(`Error loading command from file ${file}:`, error);
          }
        });
    });
  
    bot.commandsLoaded = true;
}

bot.on('spawn', () => {
  loadCommands();
});

bot.on('message', (message) => {
    console.log(message.toAnsi());
});

bot.on('spawn', () => {
    bot.chat(`/login ${config.password}`);
});