var app = require('./app');
const db = require('./pg-con');
let port = process.env.PORT || 3700;


db.connect()
    .then(function (obj) {
        console.log('DATABASE WORKING ...');
        console.log('REST PERSONA PORT 3700 . . .');
        obj.done(); // success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });


