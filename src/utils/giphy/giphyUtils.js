const config = require('../../config.json');
const Promise = require('bluebird');
const Giphy = require('giphy')(config.giphyID);

const giphyUtils = module.exports = {};

const giphy = {};
giphy.gif = Promise.promisify(Giphy.gif);

giphyUtils.getGifById = (gifId) => {
  return new Promise ( function(resolve, reject) {
    giphy.gif({ id: gifId }).then( (packet, err) => {
      if (err) {
        reject(err);
      } else {
        const gif = {};
        gif.location = packet.data.images.fixed_height.url;
        gif.name = gif.location.split('/').pop();
        resolve(gif);
      }
    });
  });
};
