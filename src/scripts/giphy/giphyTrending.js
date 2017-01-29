const giphyUtils = require('../../utils/giphy/giphyUtils.js');

const MAX_GIFS = 5;

// Regex command keywords
const giphy = 'giphy|gif|gifs';
const trending = 'trendy?|trending';
const capture = '\\d+|a';

const giphyTrending = {
  help: 'Get some trending Giphy gifs!',
  listens: 'mention',
  match: `^(?=.*\\b(?:${giphy})\\b)(?=.*\\b(?:${trending})\\b).*\\b(${capture})\\b.*$`,
  func: (msg, args) => {
    let numGifs = args[1];
    numGifs === 'a' ? numGifs = 1 : numGifs = numGifs;
    if (numGifs > MAX_GIFS) {
      const min = 3;
      numGifs = Math.floor(Math.random() * (MAX_GIFS - min + 1)) + min;
      msg.channel.sendMessage(`Ugh, that's too many gifs.  I'll get ${numGifs} instead`);
    } else {
      msg.channel.sendMessage('Some trendy gifs coming up!');
    }
    giphyUtils.getGifsTrending(numGifs).then( (gifs) => {
      gifs.forEach( gif =>
        msg.channel.sendFile(gif.location, gif.name)
      );
    }).catch( (err) => {
      console.log('ERROR: ', err);
      msg.channel.sendMessage('Ugh, Giphy\'s trending gifs are lame right now...');
    });
  }
};

module.exports = giphyTrending;
