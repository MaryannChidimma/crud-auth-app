const redis = require('redis');
const {REDIS} = require('../../keys')
const redisClient = redis.createClient(REDIS.url, {
    retry_strategy: () => 1000
});


module.exports =redisClient;