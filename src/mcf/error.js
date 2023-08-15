const ApiError = class extends Error {
  /**
   *
   * @param {any} request
   * @param {import("axios").AxiosResponse} response
   * @param {any} message
   */
  constructor(request, response, message) {
    super(message);
    this.name = 'ApiError';
    this.request = request;
    this.response = response;
  }
};

module.exports = {
  ApiError,
};
