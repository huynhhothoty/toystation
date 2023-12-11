const { Toy } = require('../models/toyModel');
const crudController = require('./crudController');

const createToy = crudController.createOne(Toy);
const updateToy = crudController.updateOne(Toy);
const deleteToy = crudController.deleteOne(Toy);
const getOneToy = crudController.getOne(Toy, null);
const getAllToy = crudController.getAll(Toy);

module.exports = {
    createToy,
    updateToy,
    deleteToy,
    getAllToy,
    getOneToy,
};
