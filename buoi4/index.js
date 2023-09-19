// const obj = require('./lib.js');
// console.log(obj);

// console.log(obj.name);
// console.log(obj.PI);

// obj.log(123456);

const { PI, name, log,
  address = 'dia chi tai ...' // default
} = require('./lib');
console.log(PI);
console.log(name);
log(123456)
console.log(address);
