let express = require('express');
let sexoController = require('../controllers/sexo');

let api = express.Router();

api.get('/sexo', sexoController.getAllSexo);
api.get('/sexo/:id', sexoController.getSexo);


module.exports = api;