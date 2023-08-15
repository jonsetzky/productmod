const MCF = require('../../mcf');
const config = require('../../config');
const { productSchemas, responseSchemas } = require('../../schemas');
const { productSchema } = require('../../schemas/product.schema');
const validate = require('../../mcf/validate');
const Joi = require('joi');
const { getProductsFixture } = require('../../../test/fixtures/product.fixture');

describe('product', () => {
  /**
   * @param {import('../../interfaces').MCFResponse<import('../../mcf/product').Product[]>} products
   */
  const productTests = (products) => {
    describe('all products from response', () => {
      it('should match schema', () => {
        products.data.forEach((product) => {
          expect(() => validate(productSchema, product)).not.toThrow();
        });
      });
      it('should have variations list which all match the schema', () => {
        products.data.forEach((product) => {
          expect(() => validate(Joi.array().items(productSchemas.productVariationSchema), product.variations)).not.toThrow();
        });
      });
    });
  };
  describe('live data', () => {
    const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

    /**
     * @type {import('../../interfaces').MCFResponse<import('../../mcf/product').Product[]>}
     */
    let products;
    it('fetches all products', async () => {
      products = await mcf.product.getProducts();
      expect(products.data[0].id).toBeDefined();
    });

    if (products) productTests(products);
  });

  describe('fixture data', () => {
    const products = getProductsFixture;
    productTests(products);
  });
});
