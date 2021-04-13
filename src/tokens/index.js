const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const { allowlistRefreshToken } = require('../redis');

const createJWT = (id, [timeAmount, timeUnit]) => (
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: timeAmount + timeUnit })
);

const createOpaqueToken = async (id, [timeAmount, timeUnit], allowlist) => {
  const opaqueToken = crypto.randomBytes(24).toString('hex');
  const expirationDate = moment().add(timeAmount, timeUnit).unix();
  await allowlist.add(opaqueToken, id, expirationDate);
  return opaqueToken;
};

module.exports = {
  access: {
    expiration: [15, 'm'],
    create(id) {
      return createJWT(id, this.expiration);
    },
  },
  refresh: {
    list: allowlistRefreshToken,
    expiration: [5, 'd'],
    create(id) {
      return createOpaqueToken(id, this.expiration, this.list);
    },
  },
};
