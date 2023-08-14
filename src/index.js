const config = require('./config');

const { product } = require('./mcf')(config.baseUrl, config.username, config.apiKey);

(async () => {
  const products = await product.getProducts();

  products.data.forEach((p) =>
    (async () => {
      const variations = await product.getProductVariations(p.id);
      variations.data.forEach((variation) => {
        // const newFeatures = variation.
      });
    })(),
  );
})();
