const Joi = require('joi');
const Endpoint = require('./endpoint');
const { productSchemas } = require('../schemas');
const validate = require('./validate');
const { getProductsQuerySchema } = require('../schemas/product.schema');

/**
 * @typedef {import('../interfaces').Product} Product
 * @typedef {import('../interfaces').ProductVariation} ProductVariation
 * @typedef {import('../interfaces').Features} Features
 */

const ProductEndpoint = class extends Endpoint {
  /**
   * @param {import('../interfaces').GetProductsQuery} [query]
   * @returns
   */
  async getProducts(query) {
    query = validate(getProductsQuerySchema, query);

    /** @type {import('../interfaces').MCFResponse<Product[]>} */
    const res = await this._request({
      url: '/v1/products',
      method: 'GET',
      params: {
        ...query,
        expand: query ? query.expand.join(',') : undefined,
      },
    });
    return res;
  }

  /**
   * @param {number} productID
   */
  async getProductVariations(productID) {
    /** @type {import('../interfaces').MCFResponse<ProductVariation[]>} */
    const res = (
      await this._request({
        url: `/v1/products/${productID}/variations`,
        method: 'GET',
      })
    ).data;
    return res;
  }

  /**
   * Modify product's variation's features
   * @param {number} productID
   * @param {number} variationID
   * @param {Features} body
   */
  async modifyProductVariationFeatures(productID, variationID, body) {
    const data = validate(productSchemas.featuresSchema, body);
    /** @type {Features} */
    const res = (
      await this._request({
        url: `/v1/products/${productID}/variations/${variationID}/features`,
        method: 'PATCH',
        data,
      })
    ).data;
    return res;
  }
};

module.exports = ProductEndpoint;
