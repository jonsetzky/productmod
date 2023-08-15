const fs = require('fs');
const path = require('path');
const { objectsPath } = require('../fixtures');

module.exports.getProductsFixture = JSON.parse(fs.readFileSync(path.join(objectsPath, 'getProducts.json')));
