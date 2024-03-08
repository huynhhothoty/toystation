const { redisClient } = require('../../configs/RedisConfig');
const { CustomError } = require('../../utils/CustomError');

const checkCache = async (req, res, next) => {
    try {
        // const data = await redisClient.get('toylist');
        // const jsonData = JSON.parse(data);
        const data = await redisClient.json.get('toylist');
        if (data) {
            res.status(200).send({
                status: 'ok',
                data: data,
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

module.exports = {
    checkCache,
};
