const Joi = require('joi');

/**
 * @typedef MCFPageMetadata
 * @property {*} page
 * @property {*} page_size
 * @property {*} page_count
 * @property {*} item_count
 */

/**
 * @template T
 * @typedef MCFResponse
 * @property {T} data
 * @property {MCFPageMetadata} meta
 */

/**
 * @typedef Product
 * @property {*} id
 * @property {*} created_at
 * @property {*} updated_at
 * @property {*} product_code
 * @property {*} supplier_code
 * @property {*} name
 * @property {*} description
 * @property {*} information
 * @property {*} keywords
 * @property {*} price
 * @property {*} purchase_price
 * @property {*} vat_rate
 * @property {*} weight
 * @property {*} parcel_type
 * @property {*} warranty
 * @property {*} brand_id
 * @property {*} supplier_id
 * @property {*} available_from
 * @property {*} available_to
 * @property {*} order_limit
 * @property {*} order_limit_min
 * @property {*} visible_from
 * @property {*} purchasablefrom
 * @property {*} seo_title
 * @property {*} seo_page_title
 * @property {*} seo_meta_description
 * @property {*} translations
 * @property {*} visibilities
 * @property {*} category_links
 * @property {*} image_links
 * @property {*} features
 * @property {*} variations
 * @property {*} brand
 * @property {*} stock_item
 */

/**
 * @typedef ProductVariation
 * @property {*} id
 * @property {*} created_at
 * @property {*} updated_at
 * @property {*} product_id
 * @property {*} sort
 * @property {*} name
 * @property {*} product_code
 * @property {*} price
 * @property {*} purchase_price
 * @property {*} weight
 * @property {*} image_id
 * @property {*} translations
 */

/**
 * @param {Joi.ObjectSchema<any>} joiSchema
 */
const validate = (joiSchema, object) => {
  const { value, error } = joiSchema.validate(object);
  if (error) throw new Error(`Error validating a schema: ${error}`);
  return value;
};

/**
 * @param {import("axios").AxiosInstance} axios
 * @returns {() => Promise<MCFResponse<Product[]>>}
 */
const getProducts = (axios) => async () => {
  const res = await axios.request({
    url: '/v1/products',
    method: 'GET',
  });
  return res.data;
};

/**
 * @param {import("axios").AxiosInstance} axios
 * @returns {() => Promise<MCFResponse<ProductVariation[]>>}
 */
const getProductVariations = (axios) => async (productID) => {
  const res = await axios.request({
    url: `/v1/products/${productID}/variations`,
    method: 'GET',
  });
  return res.data;
};

/** @param {import("axios").AxiosInstance} axios */
const modifyProductVariationFeatures = (axios) => async (productID, variationID, body) => {
  const data = validate(
    Joi.object()
      .keys({
        _color: Joi.array().items(Joi.string()),
        material: Joi.array().items(Joi.string()),
      })
      .unknown(true),
    body,
  );
  const res = await axios.request({
    url: `/v1/products/${productID}/variations/${variationID}/features`,
    method: 'PATCH',
    data,
  });
  return res.data;
};

module.exports = (axios) => ({
  // /**
  //  * Retrieve a list of product's variations
  //  * @returns {Promise<MCFResponse<Product[]>>}
  //  */
  getProducts: getProducts(axios),
  /**
   * Retrieve a list of product's variations
   * @param {number} product_id
   */
  getProductVariations: getProductVariations(axios),

  /**
   * Modify product's variation's features
   * @param {number} productID
   * @param {number} variationID
   * @returns {Promise<MCFResponse<any>>}
   */
  modifyProductVariationFeatures: modifyProductVariationFeatures(axios),
});
