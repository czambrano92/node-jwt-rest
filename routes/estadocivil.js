let express = require('express');
let estadoCivilController = require('../controllers/estadocivil');

let api = express.Router();

api.get('/estadocivil', estadoCivilController.getAllEstadoCivil);
api.get('/estadocivil/:id',estadoCivilController.getEstadoCivil);


module.exports = api;