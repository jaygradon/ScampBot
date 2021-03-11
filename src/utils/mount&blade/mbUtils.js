const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const mbUtils = module.exports = {};

let currentIndex = '';
let index = {};

const indexTemplate = {
  locations: {
    global: {
      goods: {}
    }
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
      recent: 0,
      prices: 0
    },
    sell: {
      lowest: 0,
      highest: 0,
      historic: 0,
      recent: 0,
      prices: 0
    }
  }
};

const updateIndex = () => {
  fs.writeFileSync(path.join(__dirname, 'indices', currentIndex, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');
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
        currentIndex = name;
        index = require(path.join(indexDir, 'index.json'));
        resolve();
      }
    });
  });
};

mbUtils.loadIndex = (name) => {
  return new Promise((resolve, reject) => {
    const indexDir = path.join(__dirname, 'indices', name);
    fs.exists(indexDir, (exists) => {
      if (exists) {
        currentIndex = name;
        index = require(path.join(indexDir, 'index.json'));
        resolve();
      } else {
        reject();
      }
    });
  });
};

mbUtils.addGood = (good, trueValue=0) => {
  return new Promise((resolve, reject) => {
    if (currentIndex === '') {
      reject('NO_INDEX');
    } else if (good in index.locations.global.goods) {
      reject('ALREADY_REGISTERED');
    } else {
      index.locations.global.goods[good] = JSON.parse(JSON.stringify(goodGlobalTemplate));
      index.locations.global.goods[good].value.true = trueValue;
      updateIndex();
      resolve();
    }
  });
};

mbUtils.addLocation = (location) => {
  return new Promise((resolve, reject) => {
    if (currentIndex === '') {
      reject('NO_INDEX');
    } else if (location in index.locations) {
      reject('ALREADY_REGISTERED');
    } else {
      index.locations[location] = { goods: {} };
      updateIndex();
      resolve();
    }
  });
};

mbUtils.addPrice = (name, price, priceType='buy', location='global') => {
  return new Promise((resolve, reject) => {
    let good;
    if (currentIndex === '') {
      reject('NO_INDEX');
    } else if (name in index.locations.global.goods) {
      if (name in index.locations[location].goods) {
        good = index.locations[location].goods[name];
      } else {
        index.locations[location].goods[name] = JSON.parse(JSON.stringify(goodLocalTemplate));
        good = index.locations[location].goods[name];
      }
      good.value[priceType].lowest =
        (price < good.value[priceType].lowest || good.value[priceType].lowest === 0)
          ? price
          : good.value[priceType].lowest;
      good.value[priceType].highest =
        (price > good.value[priceType].highest)
          ? price
          : good.value[priceType].highest;

      if (location !== 'global') {
        mbUtils.addPrice(name, price, priceType);
        good.value[priceType].historic =
          Math.round(((good.value[priceType].historic * good.value[priceType].prices) + price)
            / (good.value[priceType].prices + 1));
        good.value[priceType].recent = price;
        good.value[priceType].prices++;
      } else if (good.value.true === 0) {
        if (priceType === 'sell') {
          good.value.sell.recommend =
            Math.round(good.value.sell.highest -
              ((good.value.sell.highest - good.value.sell.lowest) / 1.9));
        } else {
          good.value.buy.recommend =
            Math.round(good.value.buy.lowest +
              ((good.value.buy.highest - good.value.buy.lowest) / 1.9));
        }
      } else {
        // Assumes potential buy/sell prices drift equally from true
        const lowerQuart = good.value.true - good.value[priceType].lowest;
        const upperQuart = good.value[priceType].highest - good.value.true;
        const priceRange = upperQuart > lowerQuart ? 2 * upperQuart : 2 * lowerQuart;
        if (priceType === 'sell') {
          good.value.sell.recommend = Math.round(good.value.sell.highest - (priceRange / 1.9));
        } else {
          good.value.buy.recommend = Math.round(good.value.buy.lowest + (priceRange / 1.9));
        }
      }
      updateIndex();
      resolve();
    } else {
      reject('NOT_REGISTERED');
    }
  });
};

mbUtils.getGood = (name) => {
  return new Promise((resolve, reject) => {
    if (index === '') {
      reject('NO_INDEX');
    } else if (name in index.locations.global.goods) {
      resolve(index.locations.global.goods[name]);
    } else {
      reject('NOT_REGISTERED');
    }
  });
};

mbUtils.recommendLocations = (good) => {
  return new Promise((resolve, reject) => {
    if (currentIndex === '') {
      reject('NO_INDEX');
    } else if (good in index.locations.global.goods) {
      const locations = [];
      const sortable = [];
      for (const location in index.locations) {
        if (index.locations[location].goods[good] && location !== 'global') {
          sortable.push([location, index.locations[location]]);
        }
      }
      sortable.sort((location1, location2) => {
        return location1[1].goods[good].value.buy.historic - location2[1].goods[good].value.buy.historic;
      });
      locations.push(sortable.slice(0,3));
      sortable.sort((location1, location2) => {
        return location2[1].goods[good].value.sell.historic - location1[1].goods[good].value.sell.historic;
      });
      locations.push(sortable.slice(0,3));
      resolve(locations);
    } else {
      reject('NOT_REGISTERED');
    }
  });
};

mbUtils.isGood = (good) => {
  return (good in index.locations.global.goods);
};

mbUtils.isLocation = (location) => {
  return (location in index.locations);
};
