const request = require('request');

const url = 'https://jsonplaceholder.typicode.com/users';
const urlPost = 'https://jsonplaceholder.typicode.com/posts?userId=';

const options = {
  // data: {
  //   username: 'admin',
  //   password: 'password_@123'
  // }
}
// const users = request.get(url, {}, (error, resp, body) => {
//   if (!error) return body;
// })
// console.log(users.body); // undefined

const getUsers = () => {
  return new Promise((resolve, reject) => {
    request.get(url, {}, (error, resp, body) => {
      if (!error) {
        if (resp.statusCode == 200)
          return resolve(body); // lay data tu api bang resolve
        else
          return reject('Couldn\'t find users');
      }
      return reject('Server error!');
    })
  })
}
getUsers()
  .then((data) => {
    console.log('Success');
    const users = JSON.parse(data)
    console.log(users[0]);
  })
  .catch(error => {
    console.log('Error here');
    console.log(error.message)
  }
  )

  (() => {
    console.log();

  })()