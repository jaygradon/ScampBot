const mbUtils = require('../../utils/mount&blade/mbUtils.js');

const index = 'mb(?:i|\\s+index)?|mount\\s*(?:&|and)\\s*blade(?:\\s*index)?';
const create = 'create|new|make';
const capture = '"...+"|\'...*\'';

const mbCreateIndex = {
  help: 'Create a Mount&Blade Trading Index!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${index})\\b)(?=.*\\b(?:${create})\\b).*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    mbUtils.createIndex(args[1].toLowerCase().slice(1,-1)).then((err) => {
      msg.channel.sendMessage(`Made the mount&blade index '${args[1]}' for ya`);
    }).catch((err) => {
      if (err.code === 'EEXIST') {
          msg.channel.sendMessage(`Uhmm, the index ${args[1]} already exists`);
        } else {
          msg.channel.sendMessage('Don\'t feel like it.');
        }
        console.log('ERROR: ', err);
    });
  }
};

module.exports = mbCreateIndex;
