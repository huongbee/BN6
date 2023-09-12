const a = 1;
const b = 3;


const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log(2);
    return resolve(2);
  }, 1000)
});

// async function xulyBDB(promise) {
//   const result = await promise;
//   return result;
// }

async function inKetQua() {
  // const two = await xulyBDB(p);
  const two = await (p);
  console.log(a);
  console.log(two);
  console.log(b);
}
inKetQua();

// (async () => {
//   const two = await xulyBDB(p);
//   console.log(a);
//   console.log(two);
//   console.log(b);
// })();