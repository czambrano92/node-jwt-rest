let express = require('express');
let limiteController = require('../controllers/limiteurbanocensal');

let api = express.Router();

api.get('/limiteurbano', limiteController.getAllLimite);
api.get('/limiteurbano/:id', limiteController.getLimite);


module.exports = api;