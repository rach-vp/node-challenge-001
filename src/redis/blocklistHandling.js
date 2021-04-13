const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const blocklist = require('./blocklist');

const setAsync = promisify(blocklist.set).bind(blocklist);
const existsAsync = promisify(blocklist.exists).bind(blocklist);
const createTokenHash = (token) => createHash('sha256').update(token).digest('hex');

module.exports = {
  add: async (token) => {
    const expirationDate = jwt.decode(token).exp;
    const tokenHash = createTokenHash(token);
    await setAsync(tokenHash, '');
    blocklist.expireat(tokenHash, expirationDate);
  },
  contains: async (token) => {
    const tokenHash = createTokenHash(token);
    const result = await existsAsync(tokenHash);
    return result === 1;
  },
};
