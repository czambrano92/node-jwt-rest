let express = require('express');
let clasificacionFonasaController = require('../controllers/clasificacionfonasa');

let api = express.Router();

api.get('/clasificacionfonasa', clasificacionFonasaController.getAllClasificacionFonasa);
api.get('/clasificacionfonasa/:id',clasificacionFonasaController.getClasificacionFonasa);


module.exports = api;