let express = require('express');
let catDireccionController = require('../controllers/catalogodireccion');

let api = express.Router();

api.get('/catalogodireccion/:id_persona', catDireccionController.getCatalogoDireccion);



module.exports = api;