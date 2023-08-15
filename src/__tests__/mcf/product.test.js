const MCF = require('../../mcf');
const config = require('../../config');
const { productSchemas, responseSchemas } = require('../../schemas');
const { productSchema } = require('../../schemas/product.schema');
const validate = require('../../mcf/validate');
const Joi = require('joi');
const { getProductsFixture } = require('../../../test/fixtures/product.fixture');
const { default: axios } = require('axios');

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

  describe('e2e', () => {
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

  describe('unit test', () => {
    const MockAdapter = require('axios-mock-adapter');
    const mock = new MockAdapter(axios);
    const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

    describe('getProducts', () => {
      mock.onGet('/v1/products').reply(200, getProductsFixture);

      it('should get products', async () => {
        const products = await mcf.product.getProducts();
        expect(products).toEqual(getProductsFixture);
      });

      it('should throw with invalid query', async () => {
        expect(() =>
          mcf.product.getProducts({
            query: {
              page_size: 2,
              updated_at_from: Date.now(), // invalid key
            },
          }),
        ).rejects.toThrow();
      });

      it('should succeed with valid query', async () => {
        expect(
          await mcf.product.getProducts({
            query: {
              id: 2,
              expand: ['image_links'],
              sort: 'id-asc',
            },
          }),
        ).toEqual(getProductsFixture);
      });
    });

    describe('getProductVariations', () => {});
    describe('modifyProductVariationFeatures', () => {});
  });
});
