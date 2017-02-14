const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const mbUtils = module.exports = {};

let currentIndex = '';
let index = {};
let goods = [];

const indexTemplate = {
  locations: {
    global: {}
  }
};

const goodGlobalTemplate = {
  value: {
    true: 0,
    buy: {
      lowest: 0,
      highest: 0,
      recommend: 0
    },
    sell: {
      lowest: 0,
      highest: 0,
      recommend: 0
    }
  }
};

const goodLocalTemplate = {
  value: {
    buy: {
      lowest: 0,
      highest: 0,
      historic: 0,
      recent: 0
    },
    sell: {
      lowest: 0,
      highest: 0,
      historic: 0,
      recent: 0
    }
  }
};

mbUtils.createIndex = (name) => {
  return new Promise((resolve, reject) => {
    const indexDir = path.join(__dirname, 'indices', name);
    fs.mkdir(indexDir, null, (err) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line max-len
        fs.writeFileSync(path.join(indexDir, 'index.json'), JSON.stringify(indexTemplate, null, 2), 'utf-8');
        fs.writeFileSync(path.join(indexDir, 'goods.json'), JSON.stringify([], null, 2), 'utf-8');
        currentIndex = name;
        index = require(path.join(indexDir, 'index.json'));
        goods = require(path.join(indexDir, 'goods.json'));
        resolve();
      }
    });
  });
};

mbUtils.loadIndex = (name) => {
  return new Promise((resolve, reject) => {
    if (currentIndex === name) {
      reject('LOADED');
    }
    const indexDir = path.join(__dirname, 'indices', name);
    fs.exists(indexDir, (exists) => {
      if (exists) {
        currentIndex = name;
        index = require(path.join(indexDir, 'index.json'));
        goods = require(path.join(indexDir, 'goods.json'));
        resolve();
      } else {
        reject();
      }
    });
  });
};

