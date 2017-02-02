const tomoUtils = require('../../utils/tomo/tomoUtils.js');

// Regex command keywords
const tomo = 'tomo(?:-?chan)?';
const get = 'get|grab|find|look';
const latest = 'las?test|last|today\'?s?';

const tomoLatest = {
  help: 'Get the latest edition of Tomo-chan wa Onnanoko!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${tomo})\\b)(?=.*\\b(?:${get})\\b)(?=.*\\b(?:${latest})\\b).*$`,
  func: (msg, args) => { // eslint-disable-line no-unused-vars
    tomoUtils.getLastRelease().then((release) => {
      const today = new Date();
      if (release.date.toDateString() === today.toDateString()) {
        msg.channel.sendMessage('Here\'s today\'s tomo-chan!');
      } else {
        const days = (today - release.date) / (24*3600*1000*7);
        msg.channel.sendMessage(
          `Here's the tomo-chan from ${days} day${days === 1 ? '' : 's'} ago!`
        );
      }
      msg.channel.sendFile(release.image, 'tomo.png');
    }).catch((err) => {
      console.log('ERROR: ', err);
      msg.channel.sendMessage('Hmm, I think tomo is busy today...');
    });
  }
};

module.exports = tomoLatest;
