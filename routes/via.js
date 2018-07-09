let express = require('express');
let viaController = require('../controllers/via');

let api = express.Router();

api.get('/via', viaController.getVias);
api.get('/via/:id', viaController.getVia);


module.exports = api;