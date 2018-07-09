let express = require('express');
let ocupacionController = require('../controllers/ocupacion');

let api = express.Router();

api.get('/ocupacion', ocupacionController.getOcupaciones);
api.get('/ocupacion/:id', ocupacionController.getOcupacion);


module.exports = api;