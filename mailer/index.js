const { sendMail } = require('./mailer.js');

const now = new Date();
const mailOptions = {
  to: 'receiver1@gmail.com;receiver2@gmail.com', // Email nhận
  subject: 'THIS IS SUBJECT', // Tiêu đề email
  html: `<h3>Hi Admin, <br>Send mail from NodeJS</h3><p style='color:red'>${now}<p>` // Nội dung email
};

(async () => {
  const r = await sendMail(mailOptions);
  console.log(r);
})();


// https://console.cloud.google.com tạo OAuth client ID
// https://developers.google.com/oauthplayground tạo Refresh Token
// https://mail.google.com // Authorize APIs