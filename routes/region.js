let express = require('express');
let regionController = require('../controllers/region');

let api = express.Router();

api.get('/region', regionController.getRegiones);
api.get('/region/:id', regionController.getRegion);


module.exports = api;