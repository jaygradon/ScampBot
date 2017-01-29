const giphyUtils = require('../utils/giphy/giphyUtils.js');
const giphyLib = require('../utils/giphy/giphyLibrary.json');

const ping = {
  help: 'Ping Scamp!',
  listens: 'mention',
  match: '^(ping|poke|oi|hey)$',
  func: (msg, args) => {
    if (args[0] === 'ping') {
      msg.channel.sendMessage('Pong!');
    } else {
      giphyUtils.getGifById(giphyLib.wolf_growl).then( (gif) => {
        msg.channel.sendFile(gif.location, gif.name).then (
          msg.channel.sendMessage('Grrr...')
        );
      }).catch( (err) => {
        console.log('ERROR: ', err);
      });
    }
  }
};

module.exports = ping;
