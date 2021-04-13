const handleList = require('./handleList');
const blocklist = require('./blocklist');
const allowlistRefreshToken = require('./allowlistRefreshToken');

module.exports = {
  blocklist: handleList(blocklist),
  allowlistRefreshToken: handleList(allowlistRefreshToken),
};
