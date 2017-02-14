const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const mbUtils = module.exports = {};

let currentIndex = 'warband';
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
        fs.writeFile(path.join(indexDir, 'index.json'), JSON.stringify(indexTemplate, null, 2), 'utf-8');
        fs.writeFile(path.join(indexDir, 'goods.json'), JSON.stringify([], null, 2), 'utf-8');
        index = indexTemplate;
        goods = [];
        currentIndex = name;
        resolve();
      }
    });
  });
};
