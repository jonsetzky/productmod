const fs = require('fs');
const { objectsPath } = require('../fixtures');
const MCF = require('../../src/mcf');
const path = require('path');
const config = require('../../src/config');
const { generateVariationNames } = require('./diversity');

const generate = async () => {
  if (!fs.existsSync(objectsPath)) fs.mkdirSync(objectsPath);
  if (!fs.existsSync(path.join(objectsPath, 'diversity'))) fs.mkdirSync(path.join(objectsPath, 'diversity'));

  const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

  const products = await mcf.product.getProducts({
    query: {
      page_size: 5000,
    },
  });

  fs.writeFileSync(path.join(objectsPath, 'getProducts.json'), JSON.stringify(products));
  fs.writeFileSync(
    path.join(objectsPath, 'diversity', 'variationNames.json'),
    JSON.stringify(generateVariationNames(products)),
  );
  fs.writeFileSync(path.join(objectsPath, 'diversity', 'productAttributes.json'), await fetchProductAttributes(mcf));
};

module.exports = generate;
