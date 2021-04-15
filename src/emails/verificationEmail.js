const Email = require('./email');

class VerificationEmail extends Email {
  constructor(email, address) {
    super();
    this.from = 'JungleBot <noreply@jungledevs.com>';
    this.to = email;
    this.subject = 'Email validation';
    this.text = `
      Hello! Welcome to the Jungle. Please validate your e-mail by click the link below:
      ${address}
    `;
    this.html = `
      <h1>Hello!/<h1>
      <h2>Welcome to the Jungle.</h2>
      <p>Please validate your e-mail by click the link below:<p>
      <a href="${address}">Click here to start the verification</a>
    `;
  }
}

module.exports = VerificationEmail;
