let express = require('express');
let categoriaOcupacionalController = require('../controllers/categoriaocupacional');

let api = express.Router();

api.get('/categoriaocupacional', categoriaOcupacionalController.getAllCategoriaOcupacional);
api.get('/categoriaocupacional/:id', categoriaOcupacionalController.getCategoriaOcupacional);


module.exports = api;