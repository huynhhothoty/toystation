const { redisClient } = require('../configs/RedisConfig');
const { Toy } = require('../models/toyModel');
const { ApiFeatures } = require('../utils/ApiFeature');
const { CustomError } = require('../utils/CustomError');
const crudController = require('./crudController');

const createToy = crudController.createOne(Toy);
const updateToy = crudController.updateOne(Toy);
const deleteToy = crudController.deleteOne(Toy);
const getOneToy = crudController.getOne(Toy, null);
// const getAllToy = crudController.getAll(Toy);
const getAllToy = async (req, res, next) => {
    try {
        const apiFeat = new ApiFeatures(Toy.find(), req.query);
        apiFeat.filter().sorting().pagination();

        const docs = await apiFeat.myQuery;

        // await redisClient.setEx('toylist', 5, JSON.stringify(docs));
        await redisClient.json.set('toylist', '$', docs);
        redisClient.expire('toylist', 5);

        res.status(200).send({
            status: 'ok',
            total: docs.length,
            data: docs,
        });
    } catch (error) {
        console.log(error);
        return next(new CustomError(error));
    }
};

module.exports = {
    createToy,
    updateToy,
    deleteToy,
    getAllToy,
    getOneToy,
};
