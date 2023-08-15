const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    API_USERNAME: Joi.string().required(),
    API_KEY: Joi.string().required(),
    API_BASEURL: Joi.string().uri().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  username: envVars.API_USERNAME,
  apiKey: envVars.API_KEY,
  baseUrl: envVars.API_BASEURL,
};
