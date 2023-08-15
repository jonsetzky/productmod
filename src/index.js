const yesno = require('yesno');
const config = require('./config');
const MCF = require('./mcf');

const assignVariationNameAsFeature = () => {};

(async () => {
  if (
    !(await yesno({
      question: 'Do you want to modify live products? (y/n)',
      defaultValue: null,
    }))
  )
    process.exit(1);

  throw new Error('Program is not finished');

  const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

  const products = await mcf.product.getProducts();

  const promises = products.data.forEach((p) =>
    (async () => {
      const variations = await mcf.product.getProductVariations(p.id);

      const untaggedVariations = variations.data.filter(
        (variation) =>
          !Object.entries(variation.features).find(
            (entry) => JSON.stringify(entry) === JSON.stringify(['koko', Number(variation.name)]),
          ),
      );

      untaggedVariations.forEach((variation) => {
        let newFeatures = structuredClone(variation.features);
        newFeatures.koko = Number(variation.name);
        mcf.product.modifyProductVariationFeatures(p.id, variation.id, newFeatuers);
      });
    })(),
  );

  await Promise.all(promises);
  console.log('Finished');
})();
