const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports = (list) => {
  const setAsync = promisify(list.set).bind(list);
  const existsAsync = promisify(list.exists).bind(list);
  const getAsync = promisify(list.get).bind(list);
  const delAsync = promisify(list.del).bind(list);

  return {
    async add(key, value = '', expirationDate) {
      await setAsync(key, value);
      if (!expirationDate) {
        list.expireat(key, jwt.decode(key).exp);
      } else {
        list.expireat(key, expirationDate);
      }
    },

    async contains(key) {
      const result = await existsAsync(key);
      return result === 1;
    },

    async getValue(key) {
      return getAsync(key);
    },

    async delete(key) {
      return delAsync(key);
    },
  };
};
