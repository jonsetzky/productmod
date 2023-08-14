const axios = require('axios').default;

/**
 * @param {string} baseURL Base url of the shop.
 * @param {string} username API access username.
 * @param {string} password API access password.
 */
module.exports = (baseURL, username, password) => {
  console.log('x');
  const axiosInstance = axios.create({
    baseURL,
    auth: {
      username,
      password,
    },
  });
  return {
    product: require('./product')(axiosInstance),
    /**
     * @param {string} url
     * @param {import('axios').AxiosRequestConfig} config
     */
    get: (url, config) => axiosInstance.get(url, config),
  };
};
