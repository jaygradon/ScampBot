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
        if (file.match(/\.js$/)) {
          delete require.cache[require.resolve(path.join(dir, file))];
          const command = require(path.join(dir, file));
          if (command.chatter === 'respond') {
            Scamp.responds[command.match] = command;
          } else if (command.chatter === 'hear') {
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

      args = msg.content.slice(config.prefix.length).split(' ');
      if (args[0] in Scamp.hears) {
        Scamp.hears[args[0]].func(msg, args);
      }

      if (!msg.content.startsWith(config.prefix)) {
        return;
      }

      if (args[0] in Scamp.responds) {
        Scamp.responds[args[0]].func(msg, args);
      }
    });

    Scamp.bot.login(config.token);
  }
};

module.exports = Scamp;



