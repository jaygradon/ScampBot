const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const price = 'price|cost|value';
const buy = 'buy(?:ing)?|bought|purchase';
const sell = 'sell(?:s|ing)?';
const value = '\\d+';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const findGood = (args1, args2) => {
  if (args1 && mbUtils.isGood(args1.toLowerCase().slice(1, -1))) {
    return args1.toLowerCase().slice(1, -1);
  } else if (args2 && mbUtils.isGood(args2.toLowerCase().slice(1, -1))) {
    return args2.toLowerCase().slice(1, -1);
  }
  return undefined;
};

const findLocation = (args1, args2) => {
  if (args1 && mbUtils.isLocation(args1.toLowerCase().slice(1, -1))) {
    return args1.toLowerCase().slice(1, -1);
  } else if (args2 && mbUtils.isLocation(args2.toLowerCase().slice(1, -1))) {
    return args2.toLowerCase().slice(1, -1);
  }
  return undefined;
};

const mbAddGood = {
  help: 'Add a good to a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:(?:${price})|(${buy}|${sell}))\\b)(?=.*\\b(${value})\\b).*\\B(${capture})\\B(?:.*\\B(${capture})\\B)?.*$`,
  func: (msg, args) => {

    let type = undefined;
    if (args[1]) {
      type = args[1].match(new RegExp(sell, 'i')) ? 'sell' : 'buy';
    }
    const good = findGood(args[3], args[4]);
    const location = findLocation(args[3], args[4]);

    mbUtils.addPrice(good, args[2], type, location).then(() => {
      if (location) {
        msg.channel.sendMessage(`Added price for ${good} to ${location}`);
      } else {
        msg.channel.sendMessage(`Added price for ${good} to index`);
      }
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else if (err === 'GOOD_NOT_REGISTERED') {
        msg.channel.sendMessage('Slow down, that good isn\'t registered yet');
      } else {
        msg.channel.sendMessage('I might have broken that...');
      }
    });
  }
};

module.exports = mbAddGood;