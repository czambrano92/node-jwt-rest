let express = require('express');
let fichaInstitucionController = require('../controllers/fichainstitucion');

let api = express.Router();

api.get('/fichainstitucion/:id_paciente', fichaInstitucionController.getFichaInstitucion);



module.exports = api;