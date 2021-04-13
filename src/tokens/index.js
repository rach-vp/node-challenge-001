const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const { blocklistAccessToken, allowlistRefreshToken } = require('../redis');
const { InvalidArgumentError } = require('../errors');

const verifyTokenOnBlocklist = async (token, name, blocklist) => {
  const isOnBlocklist = await blocklist.handle.contains(token);
  if (isOnBlocklist) {
    throw new jwt.JsonWebTokenError(`${name} invalidated by logout`);
  }
};

const createJWT = (id, [timeAmount, timeUnit]) => (
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: timeAmount + timeUnit })
);

const verifyJWT = async (token, name, blocklist) => {
  await verifyTokenOnBlocklist(token, name, blocklist);
  const { id } = jwt.verify(token, process.env.JWT_KEY);
  return id;
};

const invalidateJWT = (token, blocklist) => blocklist.handle.add(token);

const createOpaqueToken = async (id, [timeAmount, timeUnit], allowlist) => {
  const opaqueToken = crypto.randomBytes(24).toString('hex');
  const expirationDate = moment().add(timeAmount, timeUnit).unix();
  await allowlist.handle.add(opaqueToken, id, expirationDate);
  return opaqueToken;
};

const verifyOpaqueToken = async (refreshToken, name, allowlist) => {
  if (!refreshToken) {
    throw new InvalidArgumentError(`${name} was not sent`);
  }
  const id = await allowlist.handle.getValue(refreshToken);
  if (!id) {
    throw new InvalidArgumentError(`invalid ${name}`);
  }
  return id;
};

const invalidateOpaqueToken = async (token, allowlist) => allowlist.handle.delete(token);

module.exports = {
  access: {
    name: 'access token',
    list: blocklistAccessToken,
    expiration: [15, 'm'],
    create(id) {
      return createJWT(id, this.expiration);
    },
    verify(token) {
      return verifyJWT(token, this.name, this.list);
    },
    invalidate(token) {
      return invalidateJWT(token, this.list);
    },
  },
  refresh: {
    name: 'refresh token',
    list: allowlistRefreshToken,
    expiration: [5, 'd'],
    create(id) {
      return createOpaqueToken(id, this.expiration, this.list);
    },
    verify(token) {
      return verifyOpaqueToken(token, this.name, this.list);
    },
    invalidate(token) {
      return invalidateOpaqueToken(token, this.list);
    },
  },
};
