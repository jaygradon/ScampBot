const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const add = 'add';
const good = 'good';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';
const value = '\\d{2,4}';

const mbAddGood = {
  help: 'Add a good to a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)?(?=.*\\b(?:${add})\\b)(?=.*\\b(?:${good})\\b).*\\B(${capture})\\B.*(?:\\b(${value})\\b)?.*$`,
  func: (msg, args) => {
    mbUtils.addGood(args[1].toLowerCase().slice(1, -1), args[2]).then(() => {
      msg.channel.sendMessage(`Added the good '${args[1].toLowerCase().slice(1, -1)}' to the current index`);
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else if (err === 'ALREADY_REGISTERED') {
        msg.channel.sendMessage('Slow down, that good\'s already registered');
      } else {
        msg.channel.sendMessage('Well that\'s not working');
      }
    });
  }
};

module.exports = mbAddGood;
