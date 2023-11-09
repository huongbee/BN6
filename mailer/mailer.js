const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '39948033889-40hlia7vr1aoesp6p5f3jvp1jskl0to2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const GOOGLE_REFRESH_TOKEN = '1//04ZPb7ZiUbBVRCgYIARAAGAQSNwF-L9IrCgednPSV56rk07t0zlK8NzWzEG5XSTqK4_CVjd1cB6Ntz4srA-V95VP4B8eido5lNVk';

const SENDER_MAIL = 'huongnguyenak96@gmail.com'; // Email gửi

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