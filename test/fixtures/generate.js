const fs = require('fs');
const { objectsPath } = require('../fixtures');
const MCF = require('../../src/mcf');
const path = require('path');
const config = require('../../src/config');

const generate = async () => {
  if (!fs.existsSync(objectsPath)) fs.mkdirSync(objectsPath);

  const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

  fs.writeFileSync(path.join(objectsPath, 'getProducts.json'), JSON.stringify(await mcf.product.getProducts()));
};

module.exports = generate;
