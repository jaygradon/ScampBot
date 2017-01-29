const giphyUtils = require('../../utils/giphy/giphyUtils.js');
const giphyLib = require('../../utils/giphy/giphyLibrary.json');

const giphyPing = {
  help: 'Ping Giphy!',
  listens: 'mention',
  match: '^ping giphy$',
  func: (msg, args) => {
    msg.channel.sendMessage('Giphy!');
    giphyUtils.getGifById(giphyLib.wolf_growl).then( (gif) => {
      msg.channel.sendFile(gif.location, gif.name);
    }).catch( (err) => {
      console.log('ERROR: ', err);
      msg.channel.sendMessage('Urrk, Giphy\'s not being friendly...');
    });
  }
};

module.exports = giphyPing;
