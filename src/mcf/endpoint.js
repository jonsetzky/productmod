module.exports = class Endpoint {
  #axios;
  /** @param {import("axios").AxiosInstance} axios */
  constructor(axios) {
    /** @type {import("axios").AxiosInstance} */
    this.#axios = axios;
  }

  get _axios() {
    return this.#axios;
  }
};
