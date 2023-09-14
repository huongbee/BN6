const url = 'https://jsonplaceholder.typicode.com/users';
const urlPost = 'https://jsonplaceholder.typicode.com/posts?userId=';
// 1.
const p = new Promise((resolve, reject) => {
  //fetch(url).then()
})
// Promise chaining
const getUser = () => {
  return fetch(url).then(res => {
    if (res.status == 200) return res.json()
    else {
      console.log(res.status);
      throw Error('Lỗi lấy thông tin user');
    }
  })
    .then((data) => {
      // chon 1 user tu list
      const index = Math.floor(Math.random() * 10);
      const user = data[index];
      console.log(`Lấy thông tin post của user: ${user.id}`);
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
const getPost = (userId) => {
  return fetch(urlPost + userId).then((res) => {
    if (res.status == 200) return res.json()
    else {
      console.log(res.status);
      throw new Error('Lỗi lấy thông tin post');
    }
  }).then(posts => {
    return posts
  }).catch()
}
getUser()
  .then((user) => {
    // console.log(user);
    //  in ds ra man hinh
    getPost(user.id).then(posts => {
      posts.forEach((post) => console.log(`${post.id} - ${post.title}`));
    })
  });
