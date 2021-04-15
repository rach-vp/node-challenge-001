const handleList = require('./handleList');
const blocklistAccessToken = require('./blocklistAccessToken');
const allowlistRefreshToken = require('./allowlistRefreshToken');
const passwordRedefinition = require('./passwordRedefinition');

module.exports = {
  blocklistAccessToken: {
    list: blocklistAccessToken,
    handle: handleList(blocklistAccessToken),
  },
  allowlistRefreshToken: {
    list: allowlistRefreshToken,
    handle: handleList(allowlistRefreshToken),
  },
  passwordRedefinition: {
    list: passwordRedefinition,
    handle: handleList(passwordRedefinition),
  },
};
