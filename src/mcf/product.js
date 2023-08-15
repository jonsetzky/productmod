const Joi = require('joi');
const Endpoint = require('./endpoint');
const { productSchemas } = require('../schemas');
const validate = require('./validate');
const {
  getProductsQuerySchema,
  getProductsSchema,
  getProductVariationsSchema,
  modifyProductVariationFeaturesSchema,
} = require('../schemas/product.schema');

/**
 * @typedef {import('../interfaces').Product} Product
 * @typedef {import('../interfaces').ProductVariation} ProductVariation
 * @typedef {import('../interfaces').Features} Features
 */

const ProductEndpoint = class extends Endpoint {
  /**
   * @param {import('../interfaces').GetProductsRequestBody} [requestBody]
   * @returns
   */
  async getProducts(requestBody) {
    /** @type {import('../interfaces').MCFResponse<Product[]>} */
    const res = await this._request(
      {
        url: '/v1/products',
        method: 'GET',
      },
      requestBody,
      getProductsSchema,
    );
    return res;
  }

  /**
   * @param {import('../interfaces').GetProductVariationsRequestBody} requestBody
   */
  async getProductVariations(requestBody) {
    /** @type {import('../interfaces').MCFResponse<ProductVariation[]>} */
    const res = await this._request(
      {
        url: `/v1/products/${productID}/variations`,
        method: 'GET',
      },
      requestBody,
      getProductVariationsSchema,
    );
    return res;
  }

  /**
   * Modify product's variation's features
   * @param {import('../interfaces').ModifyProductVariationFeaturesRequestBody} requestBody
   */
  async modifyProductVariationFeatures(requestBody) {
    /** @type {Features} */
    const res = await this._request(
      {
        url: `/v1/products/${productID}/variations/${variationID}/features`,
        method: 'PATCH',
      },
      requestBody,
      modifyProductVariationFeaturesSchema,
    );
    return res;
  }
};

module.exports = ProductEndpoint;
