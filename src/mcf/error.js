const { AxiosError } = require('axios');

const ApiError = class extends Error {
  /**
   *
   * @param {AxiosError} error
   */
  constructor(error) {
    super(error.message);
    this.name = 'ApiError';

    this.getRequest = () => error.request;
    this.getResponse = () => error.response;
  }
};

module.exports = {
  ApiError,
};
