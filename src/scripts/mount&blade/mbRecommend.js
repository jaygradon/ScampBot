const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const recommend = 'rec(?:ommend)?|should|where';
const buy = 'buy(?:ing)?|bought|purchase';
const sell = 'sell(?:s|ing)?';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const mbAddPrice = {
  help: 'Ask for where to buy/sell goods from a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${recommend})\\b)(?=.*\\b(${buy}|${sell})\\b)?.*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    let type = undefined;
    if (args[1]) {
      type = args[1].match(new RegExp(sell, 'i')) ? 'sell' : 'buy';
    }
    const good = args[2].toLowerCase().slice(1, -1);

    mbUtils.recommendLocations(good).then((locations) => {
      const name = good.replace(/[^\s]+/g, function(word) {
        return word.replace(/^./, function(first) {
          return first.toUpperCase();
        });
      });

      const header = `__${name} Trading Recommendations:__`;
      let buyRec = '';
      locations[0].forEach((location) => {
        buyRec += `${location[0]} (${location[1].goods[good].value.buy.historic}), `;
      });
      buyRec = buyRec === '' ? buyRec = 'Buying: No Knowledge' : 'Buying: ' + buyRec.trim(', ');
      let sellRec = '';
      locations[1].forEach((location) => {
        sellRec += `${location[0]} (${location[1].goods[good].value.sell.historic}), `;
      });
      sellRec = sellRec === '' ? sellRec = 'Selling: No Knowledge' : 'Selling: ' + sellRec.trim(', ');

      if (type === 'buy') {
        msg.channel.sendMessage(`${header}\n${buyRec}`);
      } else if (type === 'sell') {
        msg.channel.sendMessage(`${header}\n${sellRec}`);
      } else {
        msg.channel.sendMessage(`${header}\n${buyRec}\n${sellRec}`);
      }
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else {
        msg.channel.sendMessage('I might have broken that...');
        console.log('ERROR: ', err);
      }
    });
  }
};

module.exports = mbAddPrice;
