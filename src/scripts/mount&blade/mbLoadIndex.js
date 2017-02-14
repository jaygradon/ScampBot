const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const load = 'load|switch|open';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const mbLoadIndex = {
  help: 'Load a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${load})\\b).*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    mbUtils.loadIndex(args[1].toLowerCase().slice(1, -1)).then(() => {
      msg.channel.sendMessage(`Loaded up the '${args[1].toLowerCase().slice(1, -1)}' Mount&Blade index`);
    }).catch((err) => {
      if (err === 'LOADED') {
        msg.channel.sendMessage(`The '${args[1].toLowerCase().slice(1, -1)}' Mount&Blade index is already loaded doofus`);
      } else {
        msg.channel.sendMessage(`Uhhh, I can't find any Mount&Blade index going by '${args[1].toLowerCase().slice(1, -1)}'`);
      }
    });
  }
};

module.exports = mbLoadIndex;
