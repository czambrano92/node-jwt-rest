let express = require('express');
let ocupacionDetalladaController = require('../controllers/ocupaciondetallada');

let api = express.Router();

api.get('/ocupaciondetallada', ocupacionDetalladaController.getAllOcupacionDetallada);
api.get('/ocupaciondetallada/:id', ocupacionDetalladaController.getOcupacionDetallada);


module.exports = api;