const url = 'https://jsonplaceholder.typicode.com/users';
const urlPost = 'https://jsonplaceholder.typicode.com/posts?userId=';

const getPosts = async () => {
  const data = await fetch(url); // dong bo
  const users = await data.json(); // dong bo
  const user = users[0];
  const postData = await fetch(urlPost + user.id);  // dong bo
  const posts = await postData.json(); // dong bo
  return posts;
};

(async () => {
  try {
    const p = await getPosts();
    console.log(p[0].title);
  } catch (error) {
    console.log(error.message);
  }
})();

// npm install -g nodemon