const { ApiError } = require('./error');
const validate = require('./validate');

module.exports = class Endpoint {
  #axios;

  /** @param {import("axios").AxiosInstance} axios */
  constructor(axios) {
    /** @type {import("axios").AxiosInstance} */
    this.#axios = axios;
  }

  /**
   *
   * @param {import("axios").AxiosRequestConfig} _config
   */
  async _request(_config, requestBody, bodySchema) {
    const { query, body } = { ...validate(bodySchema, requestBody) }; // destructure allows to ignore undefined values

    const config = _config;
    if (query) config.params = query;
    if (body) config.data = body;

    const res = await this.#axios.request(config).catch((err) => {
      throw new ApiError(err);
    });
    return res.data;
  }
};
