const handleList = require('./handleList');
const blocklistAccessToken = require('./blocklistAccessToken');
const allowlistRefreshToken = require('./allowlistRefreshToken');

module.exports = {
  blocklistAccessToken: {
    list: blocklistAccessToken,
    handle: handleList(blocklistAccessToken),
  },
  allowlistRefreshToken: {
    list: allowlistRefreshToken,
    handle: handleList(allowlistRefreshToken),
  },
};
