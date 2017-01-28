/*
 *  ScampBot for Discord
 */
const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');

const bot = new Discord.Client();

const commandList = fs.readdirSync(`${__dirname}/commands`);
const commands = {};

commandList.forEach((command) => {
  if (command.match(/\.js$/)) {
    delete require.cache[require.resolve(`./commands/${command}`)];
    commands[command.slice(0, -3)] = require(`./commands/${command}`);
  }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', msg => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) {
    return;
  }

  args = msg.content.slice(config.prefix.length).split(' ');
  if (args[0] in commands) {
    commands[args[0]].func(msg, args);
  }
});

bot.login(config.token);
