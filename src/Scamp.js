/*
 *  ScampBot for Discord
 */
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const Scamp = {
  bot: new Discord.Client(),
  responds: {},
  hears: {},

  load: (dir) => {
    fs.readdir(dir, (_, files) => {
      files.forEach((file) => {
        console.log(`Loaded: ${file}`);
        if (file.match(/\.js$/)) {
          delete require.cache[require.resolve(path.join(dir, file))];
          const command = require(path.join(dir, file));
          if (command.listens === 'mention') {
            Scamp.responds[command.match] = command;
          } else if (command.listens === 'ambient') {
            Scamp.hears[command.match] = command;
          }
        }

        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          Scamp.load(path.join(dir, file));
        }
      });
    });
  },

  listen: () => {
    Scamp.bot.on('ready', () => {
      console.log('I am ready!');
    });

    Scamp.bot.on('message', msg => {
      if (msg.author.bot) {
        return;
      }

      if (msg.mentions.users.has(config.botID)) {
        for (key in Scamp.responds) {
          regexKey = new RegExp(key, 'i');
          // Need a better way to remove whitespace to left OR right of mention, not both
          const args = msg.content.replace(`<@${config.botID}>`, '')
            .replace('  ', ' ')
            .trim()
            .match(regexKey);
          if (args) {
            Scamp.responds[key].func(msg, args);
          }
        }
      } else {
        for (key in Scamp.hears) {
          const args = key.match(msg.content);
          if (args) {
            Scamp.hears[key].func(msg, args);
          }
        }
      }
    });

    Scamp.bot.login(config.token);
  }
};

module.exports = Scamp;
