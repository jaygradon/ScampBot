/*
 *  ScampBot for Discord
 */
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const Scamp = module.exports = {};

const bot = new Discord.Client();
const responds = {};
const hears = {};

Scamp.load = (dir) => {
  fs.readdir(dir, (_, files) => {
    files.forEach((file) => {
      if (file.match(/\.js$/)) {
        console.log(`Loaded: ${file}`);
        delete require.cache[require.resolve(path.join(dir, file))];
        const command = require(path.join(dir, file));
        if (command.listens === 'mention') {
          responds[command.match] = command;
        } else if (command.listens === 'ambient') {
          hears[command.match] = command;
        }
      }

      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        Scamp.load(path.join(dir, file));
      }
    });
  });
};

Scamp.listen = () => {
  bot.on('ready', () => {
    console.log('I live again!\n');
  });

  bot.on('message', msg => {
    if (msg.author.bot) {
      return;
    }

    if (msg.mentions.users.has(config.botID)) {
      for (key in responds) {
        regexKey = new RegExp(key, 'i');
        const args = msg.content.replace(`<@${config.botID}>`, '')
          .replace('  ', ' ')
          .trim()
          .match(regexKey);
        if (args) {
          responds[key].func(msg, args);
        }
      }
    } else {
      for (key in hears) {
        regexKey = new RegExp(key, 'i');
        const args = msg.content.match(regexKey);
        if (args) {
          hears[key].func(msg, args);
        }
      }
    }
  });

  bot.login(config.token);
};
