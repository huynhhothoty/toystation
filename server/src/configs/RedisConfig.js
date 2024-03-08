const redis = require('redis');

// const redisClient = redis.createClient({
//     url: 'redis://:1CjqaDOgHGeqQ7J6ulb5EGUr1UAABXHF@redis-15209.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:15209',
// });
const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});

redisClient
    .connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.log(err.message);
    });

module.exports = { redisClient };
