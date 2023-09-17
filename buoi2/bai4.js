const urlsToFetch = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

const r = urlsToFetch.map((url) => {
  return fetch(url).then((response) => response.json())
    .then(result => result);
});

// console.log(r);

Promise.all(r).then((result) => console.log(result));