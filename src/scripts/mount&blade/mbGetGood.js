const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const get = 'get|find|retrieve|what|print';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const mbGetGood = {
  help: 'Get info on a good from a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${get})\\b).*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    let name = args[1].toLowerCase().slice(1, -1);
    mbUtils.getGood(name).then((good) => {
      name = name.replace(/[^\s]+/g, function(word) {
        return word.replace(/^./, function(first) {
          return first.toUpperCase();
        });
      });
      const table = `
__${name} Global Prices:__
Buying:   ${good.value.buy.lowest} - ${good.value.buy.highest}
Selling:   ${good.value.sell.lowest} - ${good.value.sell.highest}
__*Buy\@${good.value.buy.recommend}*__  __*Sell\@${good.value.sell.recommend}*__
`;
      msg.channel.sendMessage(`${table}`);
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else if (err === 'NOT_REGISTERED') {
        msg.channel.sendMessage(`I\'ve never even heard of ${args[1].toLowerCase().slice(1, -1)}`);
      } else {
        msg.channel.sendMessage('I might have broken that...');
        console.log('ERROR: ', err);
      }
    });
  }
};

module.exports = mbGetGood;
