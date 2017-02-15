const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s*index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const add = 'add';
const location = 'location|town|village';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const mbAddLocation = {
  help: 'Add a location to a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${add})\\b)(?=.*\\b(?:${location})\\b).*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    mbUtils.addLocation(args[1].toLowerCase().slice(1, -1)).then(() => {
      msg.channel.sendMessage(`Added the location '${args[1].toLowerCase().slice(1, -1)}' to the current index`);
    }).catch((err) => {
      if (err === 'NO_INDEX') {
        msg.channel.sendMessage('You aren\'t using an index dummy');
      } else if (err === 'ALREADY_REGISTERED') {
        msg.channel.sendMessage('Slow down, that location\'s already registered');
      } else {
        msg.channel.sendMessage('Well that\'s not working');
        console.log('ERROR: ', err);
      }
    });
  }
};

module.exports = mbAddLocation;
