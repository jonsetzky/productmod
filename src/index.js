const yesno = require('yesno');
const { program } = require('commander');
const config = require('./config');
const MCF = require('./mcf');

program.option('--modify');
program.parse();

const options = program.opts();
const modify = !!options.modify;

(async () => {
  //   throw new Error('Program is not finished');
  if (
    !(await yesno({
      question: `Do you want to run the script? ${
        modify ? '(It will modify live data)' : "(It won't modify live data - run with --modify to modify)"
      }(y/n)`,
      defaultValue: null,
    }))
  )
    process.exit(1);

  const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

  const products = await mcf.product.getProducts({
    query: {
      page_size: 10000,
      expand: ['variations', 'variations.features'],
    },
  });

  let modifiedProducts = 0;
  await Promise.all(
    products.data.map((product) => {
      const untaggedVariations = product.variations.filter(
        (variation) =>
          !Object.entries(variation.features).find(
            (entry) => JSON.stringify(entry) === JSON.stringify(['koko', Number(variation.name)]),
          ),
      );

      return Promise.all(
        untaggedVariations.map((variation) => {
          let newFeatures = structuredClone(variation.features);
          newFeatures.koko = variation.name;
          modifiedProducts += 1;
          if (!modify) return Promise.resolve(); // dont modify actual products
          return mcf.product.modifyProductVariationFeatures(p.id, variation.id, newFeatuers);
        }),
      );
    }),
  );

  console.log('Finished');
  if (!modify) console.log(modifiedProducts, "products would've been modified");
  else console.log(modifiedProducts, 'products was modified');
})();
