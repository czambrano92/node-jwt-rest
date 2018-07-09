let express = require('express');
let cDireccionController = require('../controllers/complementodireccion');

let api = express.Router();


api.get('/complementodireccion', cDireccionController.getAllComplementoDireccion);
api.get('/complementodireccion/:id', cDireccionController.getComplementoDireccion);


module.exports = api;