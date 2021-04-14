const AccessControl = require('accesscontrol');

const control = new AccessControl();

control.grant('admin')
  .createAny('article')
  .readAny('article')
  .updateAny('article')
  .deleteAny('article')
  .createAny('author')
  .readAny('author')
  .updateAny('author')
  .deleteAny('author')
  .createAny('user')
  .readAny('user')
  .updateAny('user')
  .deleteAny('user');

control.grant('subscriber')
  .readAny('article')
  .updateOwn('user', ['password']);

module.exports = control;
