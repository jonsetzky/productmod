const Joi = require('joi');
const validate = require('../../src/mcf/validate');
const MCF = require('../../src/mcf');

/**
 * Generates a list of all existing variations from a list of products
 * @param {import("../../src/interfaces").Product[]} products
 */
const generateVariationNames = (products) => {
  validate(
    Joi.array().items(
      Joi.object()
        .keys({
          variations: Joi.array().items(
            Joi.object()
              .keys({
                name: Joi.string().required(),
              })
              .unknown(true),
          ),
        })
        .unknown(true)
        .required(),
    ),
    products,
  );

  return validate(
    Joi.array().items(Joi.string()),
    products.reduce((names, product) => names.concat(product.variations.map((variation) => variation.name)), []),
  );
};

/**
 *
 * @param {MCF} mcf
 */
const fetchProductAttributes = async (mcf) => {
  return (await mcf.get('/v1/product-attributes')).data;
};

module.exports = {
  generateVariationNames,
  fetchProductAttributes,
};
