
function print(n, callback) {
  // callback = (i) => { return i % 2 == 0 };
  for (let i = 0; i < n; i++) {
    const dk = callback(i); // bool // i % 2 == 1
    if (dk)
      console.log(i);
  }
}

const n = 100;
// const laSoChan = (i) => { return i % 2 == 0 }
// print(n, (i) => { return i % 2 == 0 });
print(n, (i) => i % 2 == 1);
print(n, (i) => Math.sqrt(i) == Math.floor(Math.sqrt(i)));
print(n, (i) => i % 9 == 8);

// i%2==0
// i%2==1
// Math.sqrt(i)
// i%9==8