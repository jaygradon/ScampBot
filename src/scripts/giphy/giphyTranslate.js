const giphyUtils = require('../../utils/giphy/giphyUtils.js');

// Regex command keywords
const giphy = 'giphy|gif';
const translate = 'translate|get|grab|find|make|look';
const capture = '"\\w\\w\\w+"|\'\\w\\w\\w+\'';

const giphyTranslate = {
  help: 'Translate a phrase to a Giphy gif!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${giphy})\\b)(?=.*\\b(?:${translate})\\b).*\\B(${capture})\\B.*$`,
  func: (msg, args) => {
    const phrase = args[1]
      .slice(1, -1) // Remove starting and ending quotes
      .trim(); // Clean up spaces
    giphyUtils.getGifByPhrase(phrase).then((gif) => {
      msg.channel.sendFile(gif.location, gif.name);
    }).catch((err) => {
      console.log('ERROR: ', err);
      msg.channel.sendMessage('Hmm, Giphy\'s translation skills aren\'t up to that right now...');
    });
  }
};

module.exports = giphyTranslate;
