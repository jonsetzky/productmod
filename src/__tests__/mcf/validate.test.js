const validate = require('../../mcf/validate');
const Joi = require('joi');

describe('validate', () => {
  describe('basic', () => {
    const schema1 = Joi.object().keys({
      x: Joi.string(),
      y: Joi.number().required(),
    });

    it('should succeed on a valid object', async () => {
      const validObject = {
        x: 'test',
        y: 1,
      };
      expect(validate(schema1, validObject)).toEqual(validObject);
    });

    it('should throw on an invalid object', async () => {
      const invalidObject = {
        x: 'test',
      };
      expect(() => validate(schema1, invalidObject)).toThrow();
    });
  });
});
