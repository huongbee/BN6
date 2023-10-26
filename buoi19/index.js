const jwt = require('jsonwebtoken');
const md5 = require('md5');

const SECRET_KEY = md5(md5('secret_key@1234560987'));
console.log({ SECRET_KEY });

const userInfo = {
  id: 1,
  fullname: 'John Smith',
  password: '1234',
  age: 22
}
delete userInfo.password; // required
const token = jwt.sign(userInfo, SECRET_KEY, {
  algorithm: 'HS256',
  expiresIn: 60
});
console.log({ token });
// const decodedInfo = jwt.decode(token, { algorithm: 'HS256' });
// console.log({ decodedInfo });

try {
  const verifyInfo = jwt.verify(token, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: 60
  });
  console.log(verifyInfo);

  // refresh token by jwt.sign
} catch (e) {
  console.log('Invalid token');
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJKb2huIFNtaXRoIiwiaWF0IjoxNjk4MTUwNDk0fQ.bJcBrFwUPe1I-V8QfIxEK7TAeHu3nlkOurg3Ip-fOG4
