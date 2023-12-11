const { Deal } = require('../models/dealModel');
const { createOne, updateOne, getAll, getOne, deleteOne } = require('./crudController');

const createDeal = createOne(Deal);
const updateDeal = updateOne(Deal);
const getAllDeal = getAll(Deal);
const getOneDeal = getOne(Deal);
const deleteDeal = deleteOne(Deal);

module.exports = {
    createDeal,
    updateDeal,
    getAllDeal,
    getOneDeal,
    deleteDeal,
};
