const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET';

const GOOGLE_REFRESH_TOKEN = 'GOOGLE_REFRESH_TOKEN';

const SENDER_MAIL = 'sendermail@gmail.com'; // Email gửi

const myOAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN
});
module.exports = {
  /**
   *
   * @param {*} args
   * @returns boolean
   */
  sendMail: async (args) => {
    try {
      const accessTokenObj = await myOAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: SENDER_MAIL,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refresh_token: GOOGLE_REFRESH_TOKEN,
          accessToken: accessTokenObj?.token
        }
      })
      await transport.sendMail(args)
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}