const Redis = require("ioredis");

const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  // username: "", // needs Redis >= 6
  // password: "",
  // db: 0, // Defaults to 0
});
// redis.get('username', (err, result) => {
//   if (!err) console.log(result);
//   else console.log(err);
// })
// redis.set('address', 'Kmin', 'EX', 60);
redis.ttl('address').then(ttl => console.log(ttl));
// redis.del('username');
