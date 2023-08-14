const Joi = require('joi');

const mcfPageMetaSchema = Joi.object()
  .keys({
    page: Joi.number(),
    page_size: Joi.number(),
    page_count: Joi.number(),
    item_count: Joi.number(),
  })
  .meta({ className: 'MCFPageMeta' });

const mcfResponseTemplate = Joi.object().meta({ className: 'T' });
const mcfResponseSchema = (t) =>
  Joi.object()
    .keys({
      data: t,
      meta: mcfPageMetaSchema,
    })
    .meta({ className: 'MCFResponse<T>' });

module.exports = {
  mcfPageMetaSchema,
  mcfResponseSchema,
  _mcfResponseSchema: mcfResponseSchema(mcfResponseTemplate),
};
