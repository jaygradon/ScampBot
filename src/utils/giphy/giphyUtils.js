const config = require('../../config.json');
const Promise = require('bluebird');
const Giphy = require('giphy')(config.giphyID);

const giphyUtils = module.exports = {};

const giphy = {};
giphy.gif = Promise.promisify(Giphy.gif);
giphy.translate = Promise.promisify(Giphy.translate);

giphyUtils.getGifById = (gifId) => {
  return new Promise ( (resolve, reject) => {
    giphy.gif({ id: gifId }).then( (packet, err) => {
      if (err) {
        reject(err);
      } else {
        const gif = {};
        gif.location = packet.data.images.original.url;
        gif.name = gif.location.split('/').pop();
        resolve(gif);
      }
    });
  });
};

giphyUtils.getGifByPhrase = (phrase) => {
  phrase = phrase.replace(' ', '+');
  return new Promise ( (resolve, reject) => {
    giphy.translate({ s: phrase }).then( (packet, err) => {
      if (err) {
        reject(err);
      } else {
        const gif = {};
        gif.location = packet.data.images.original.url;
        gif.name = gif.location.split('/').pop();
        resolve(gif);
      }
    });
  });
};
