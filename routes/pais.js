let express = require('express');
let paisController = require('../controllers/pais');

let api = express.Router();

api.get('/pais', paisController.getPaises);
api.get('/pais/:id', paisController.getPais);


module.exports = api;