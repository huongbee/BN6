const Redis = require("ioredis");
const redisConfig = require("../configs/redis.config");
const redis = new Redis({
  port: redisConfig.REDIS_PORT,
  host: redisConfig.REDIS_HOST
});

module.exports = {
  setTimeInSeconds: (key, value, timeInSeconds) => {
    return redis.set(key, value, 'EX', timeInSeconds)
  },
  set: (key, value) => {
    return redis.set(key, value)
  },
  get: (key) => {
    return redis.get(key)
  },
  getTTL: (key) => {
    return redis.ttl(key)
  },
  del: (key) => {
    return redis.del(key)
  },
}