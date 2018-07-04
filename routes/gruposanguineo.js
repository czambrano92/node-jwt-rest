let express = require('express');
let grupoSanguineoController = require('../controllers/gruposanguineo');

let api = express.Router();

api.get('/gruposSanguineos', grupoSanguineoController.getGruposSanguineos);
api.get('/grupoSanguineo/:id', grupoSanguineoController.getGrupoSanguineo);


module.exports = api;