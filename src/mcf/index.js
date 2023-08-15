const axios = require('axios').default;
const ProductEndpoint = require('./product');

const MCF = class {
  #axios;
  /**
   * @param {string} baseURL Base url of the shop.
   * @param {string} username API access username.
   * @param {string} apiKey API key.
   */
  constructor(baseURL, username, apiKey) {
    this.#axios = axios.create({
      baseURL,
      auth: {
        username,
        apiKey,
      },
    });
    this.product = new ProductEndpoint(this.#axios);
  }

  /**
   * @param {string} url
   * @param {import('axios').AxiosRequestConfig} config
   */ get(url, config) {
    return this.#axios.request({
      url,
      ...config,
    });
  }
};

module.exports = MCF;
