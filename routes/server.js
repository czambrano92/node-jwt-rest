let express = require('express');
let serverController = require('../controllers/server');

let api = express.Router();


api.post('/authenticate', serverController.getAuthentication);


module.exports = api;