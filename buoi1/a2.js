const a = 1;
const b = 3;

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(2);
    resolve();
  }, 1000);
});

console.log(a);

promise1
  .then(() => {
    console.log(b);
  });
