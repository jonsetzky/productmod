const Joi = require('joi');
const featuresSchema = Joi.object()
  .unknown()
  .meta({
    unknownType: Joi.alternatives().try(Joi.array(), Joi.string(), Joi.number()),
    className: 'Features',
  });

const translationSchema = Joi.object()
  .keys({
    language: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    information: Joi.string(),
    seo_title: Joi.string(),
    seo_page_title: Joi.string(),
    seo_meta_description: Joi.string(),
  })
  .unknown(false);

const stockItemSchema = Joi.object()
  .keys({
    id: Joi.number(),
    created_at: Joi.string(),
    updated_at: Joi.string(),
    barcode: Joi.string(),
    location: Joi.string(),
    enabled: Joi.boolean(),
    quantity: Joi.number(),
    reserved: Joi.number(),
    balance: Joi.number(),
    balance_alert: Joi.boolean(),
    balance_limit: Joi.number(),
    backorder_enabled: Joi.boolean(),
    backorder_estimate: Joi.string(),
    code: Joi.string(),
    product_id: Joi.number(),
    variation_id: Joi.number(),
  })
  .unknown(false);

const productVariationSchema = Joi.object()
  .keys({
    id: Joi.number(),
    created_at: Joi.string(),
    updated_at: Joi.string(),
    image_id: Joi.number(),
    product_id: Joi.number(),
    sort: Joi.number(),
    name: Joi.string(),
    product_code: Joi.string(),
    price: Joi.number(),
    purchase_price: Joi.number(),
    weight: Joi.number(),
    features: featuresSchema,
    stock_item: stockItemSchema,
  })
  .meta({ className: 'ProductVariation' })
  .unknown(false);

const productSchema = Joi.object()
  .keys({
    id: Joi.number(),
    created_at: Joi.string(),
    updated_at: Joi.string(),
    product_code: Joi.string(),
    supplier_code: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    information: Joi.string(),
    keywords: Joi.string(),
    price: Joi.number(),
    purchase_price: Joi.number(),
    vat_rate: Joi.number(),
    weight: Joi.number(),
    parcel_type: Joi.string(),
    warranty: Joi.number(),
    brand_id: Joi.number(),
    supplier_id: Joi.number(),
    available_from: Joi.string(),
    available_to: Joi.string(),
    order_limit: Joi.number(),
    order_limit_min: Joi.number(),
    visible_from: Joi.string(),
    purchasable_from: Joi.string(),
    seo_title: Joi.string(),
    seo_page_title: Joi.string(),
    seo_meta_description: Joi.string(),
    translations: Joi.array().items(translationSchema),
    visibilities: Joi.array().items(
      Joi.object().keys({
        version_id: Joi.number(),
        is_visible: Joi.boolean(),
      }),
    ),
    category_links: Joi.array().items(
      Joi.object().keys({
        created_at: Joi.string(),
        updated_at: Joi.string(),
        category_id: Joi.number(),
        category_sort: Joi.number(),
        product_id: Joi.number(),
        product_sort: Joi.number(),
      }),
    ),
    image_links: Joi.array().items(
      Joi.object().keys({
        product_id: Joi.number(),
        image_id: Joi.number(),
        sort: Joi.number(),
        filename: Joi.string(),
        caption: Joi.string(),
      }),
    ),
    features: featuresSchema,
    variations: Joi.array().items(productVariationSchema),
    brand: Joi.object().keys({
      id: Joi.number(),
      created_at: Joi.string(),
      updated_at: Joi.string(),
      name: Joi.string(),
      description: Joi.string(),
      seo_title: Joi.string(),
      seo_page_title: Joi.string(),
      seo_meta_description: Joi.string(),
      template: Joi.string(),
    }),
    stock_item: stockItemSchema,
  })
  .meta({ className: 'Product' })
  .unknown(false);

module.exports = {
  productSchema,
  productVariationSchema,
  featuresSchema,
};
