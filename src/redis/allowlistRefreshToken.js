const redis = require('redis');

module.exports = redis.createClient({ prefix: 'allowlist-refresh-token:' });
