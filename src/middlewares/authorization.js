const control = require('../accessControl');

const methods = {
  create: {
    any: 'createAny',
    own: 'createOwn',
  },
  read: {
    any: 'readAny',
    own: 'readOwn',
  },
  update: {
    any: 'updateAny',
    own: 'updateOwn',
  },
  delete: {
    any: 'deleteAny',
    own: 'deleteOwn',
  },
};

module.exports = (entity, action) => (req, res, next) => {
  // const { role } = req.user;
  const role = 'subscriber';
  const rolePermissions = control.can(role);
  const actions = methods[action];

  const anyPermission = rolePermissions[actions.any](entity);
  const ownPermission = rolePermissions[actions.own](entity);
  const isAllowed = anyPermission.granted || ownPermission.granted;
  if (!isAllowed) {
    return res.status(403).end();
  }

  req.acess = {
    any: {
      granted: anyPermission.granted,
      attributes: anyPermission.attributes,
    },
    own: {
      granted: ownPermission.granted,
      attributes: ownPermission.attributes,
    },
  };

  return next();
};
