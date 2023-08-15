module.exports.objectsPath = './test/fixtures/objects';

const generate = require('./generate');
const { getProductsFixture } = require('./product.fixture');

module.exports.generate = generate;
module.exports.getProductsFixture = getProductsFixture;
