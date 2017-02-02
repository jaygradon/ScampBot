const config = require('../../config.json');
const Promise = require('bluebird');
const Giphy = require('giphy')(config.giphyID);

const giphyUtils = module.exports = {};

const giphy = {};
giphy.gif = Promise.promisify(Giphy.gif);
giphy.translate = Promise.promisify(Giphy.translate);
giphy.trending = Promise.promisify(Giphy.trending);

giphyUtils.getGifById = (gifId) => {
  return new Promise ((resolve, reject) => {
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
  return new Promise ((resolve, reject) => {
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

giphyUtils.getGifsTrending = (numGifs = 3) => {
  return new Promise ((resolve, reject) => {
    giphy.trending({ limit: numGifs }).then( (packet, err) => {
      if (err) {
        reject(err);
      } else {
        const gifs = [];
        for (let i = 0; i < numGifs; i++) {
          const gif = {};
          gif.location = packet.data[i].images.original.url;
          gif.name = gif.location.split('/').pop();
          gifs.push(gif);
        }
        resolve(gifs);
      }
    });
  });
};
