const { ApiError } = require('./error');

module.exports = class Endpoint {
  #axios;

  /** @param {import("axios").AxiosInstance} axios */
  constructor(axios) {
    /** @type {import("axios").AxiosInstance} */
    this.#axios = axios;
  }

  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   */
  async _request(config) {
    const res = await this.#axios.request(config).catch((err) => {
      throw new ApiError(err.request, err.response, err.message);
    });
    return res.request;
  }
};
