const nodemailer = require('nodemailer');

const productionEmailSet = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
};

const devEmailSet = (testAccount) => ({
  host: 'smtp.ethereal.email',
  auth: testAccount,
});

const createEmailSettings = async () => {
  if (process.env.NODE_ENV === 'production') {
    return productionEmailSet;
  }
  const testAccount = await nodemailer.createTestAccount();
  return devEmailSet(testAccount);
};

class Email {
  async sendEmail() {
    const emailSet = await createEmailSettings();
    const transport = nodemailer.createTransport(emailSet);
    const info = await transport.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  }
}

module.exports = Email;
