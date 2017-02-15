const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const add = 'add';
const good = 'good';
const value = '\\d+';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const mbAddGood = {
  help: 'Add a good to a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${add})\\b)(?=.*\\b(?:${good})\\b)(?=.*\\b(${value})\\b)?.*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    mbUtils.addGood(args[2].toLowerCase().slice(1, -1), args[1]).then(() => {
      msg.channel.sendMessage(`Added the good '${args[2].toLowerCase().slice(1, -1)}' to the current index`);
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else if (err === 'ALREADY_REGISTERED') {
        msg.channel.sendMessage('Slow down, that good\'s already registered');
      } else {
        msg.channel.sendMessage('Well that\'s not working');
        console.log('ERROR: ', err);
      }
    });
  }
};

module.exports = mbAddGood;
