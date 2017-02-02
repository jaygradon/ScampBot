const Promise = require('bluebird');
const rss = require('rss-to-json');

const tomoUtils = module.exports = {};

tomoUtils.getLastRelease = () => {
  return new Promise((resolve, reject) => {
    rss.load('http://read.tomochan.today/rss', (err, res) => {
      if (err) {
        reject(err);
      } else {
        const release = {};
        release.date = new Date(res.items[0].created);
        release.image = res.items[0].description.split('"')[1];
        resolve(release);
      }
    });
  });
};
