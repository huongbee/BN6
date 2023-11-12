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

//b1. https://console.cloud.google.com tạo OAuth client ID
//b2. https://developers.google.com/oauthplayground tạo Refresh Token
//nhập https://mail.google.com // Authorize APIs
//chọn button Exchange authorization code for tokens, click auto f5
//chọn icon configuration bên góc phải, nhập CLIENT_ID và CLIENT_SECRET, nhấn close
