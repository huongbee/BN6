const Request = require('./Helper');
const url = 'https://jsonplaceholder.typicode.com/users';
const urlPost = 'https://jsonplaceholder.typicode.com/posts?userId=';


(async () => {
  try {
    const users = await Request.requestGet(url);
    const user = users[0];
    const posts = await Request.requestGet(urlPost + user.id);
    console.log(posts);
  } catch (error) {
    console.log(error.message);
  }
})();