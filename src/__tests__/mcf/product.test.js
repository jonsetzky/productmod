const mcf = require('../../mcf');
const config = require('../../config');
const { productSchema } = require('../../schemas/product.schema');

describe('product', () => {
  describe('real data', () => {
    const { product } = mcf(config.baseUrl, config.username, config.apiKey);

    /** @type {import('../../interfaces').Product[]} */
    let products;
    it('fetches all products', async () => {
      products = (await product.getProducts()).data;
      expect(products[0].id).toBeDefined();
    });

    test('products variations is a list', async () => {
      products.forEach((p) => {
        expect(typeof p.variations).toBe('array');
      });
    });

    test('products match schema', async () => {
      products.forEach((p) => productSchema.validate(p));
    });
  });
});
