const Email = require('./email');

class PasswordRedefition extends Email {
  constructor(email, address) {
    super();
    this.from = 'JungleBot <noreply@jungledevs.com>';
    this.to = email;
    this.subject = 'Password Redefinition';
    this.text = `
      Hello! Here is your redefinition link. Please redefine your password by clicking the link below:
      ${address}
      If it wasn't you don't click!
    `;
    this.html = `
      <h1>Hello!/<h1>
      <h2>Here is your redefinition link.</h2>
      <p>Please redefine your password by clicking the link below:<p>
      <a href="${address}">Click here to start the verification</a>
      <p>If it wasn't you don't click!</p>
    `;
  }
}

module.exports = PasswordRedefition;
