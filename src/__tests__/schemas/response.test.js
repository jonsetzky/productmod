const Joi = require('joi');
const { responseSchemas } = require('../../schemas');

describe('schemas', () => {
  describe('response', () => {
    it('should validate valid data', async () => {
      const { error } = responseSchemas
        .mcfResponseSchema(Joi.string())
        .validate({ data: '2', meta: { page: 2, page_size: 4, page_count: 9, item_count: 2 } });
      expect(error).not.toBeDefined();
    });

    it('should invalidate invalid data', async () => {
      const { error } = responseSchemas
        .mcfResponseSchema(Joi.string())
        .validate({ data: 2, meta: { page: 2, page_size: 4, page_count: 9, item_count: 2 } });
      expect(error).toBeDefined();
    });
  });
});
