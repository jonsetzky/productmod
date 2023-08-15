/**
 * @template T
 * @param {import("joi").ObjectSchema<any>} joiSchema
 * @param {T} object
 * @returns {T}
 */
const validate = (joiSchema, object) => {
  const { value, error } = joiSchema.validate(object);
  if (error) throw new Error(`Error validating a schema: ${error}`);
  return value;
};

module.exports = validate;
