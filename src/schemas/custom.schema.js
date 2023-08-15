/**
 * @type {() => import('joi').CustomValidator<string, any>}
 * @param {string[]} enums Items of the comma seperated list
 */
const commaSeperatedList = (enums) => (value, helpers) => {
  const items = value.split(',');
  const invalidItem = items.find((item) => !enums.includes(item));
  if (invalidItem) return helpers.message(`comma seperated list contains invalid item: ${invalidItem}`);

  return value;
};

module.exports = {
  commaSeperatedList,
};
