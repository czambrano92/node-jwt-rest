var app = require('./app');
const db = require('./pg-con');
let port = process.env.PORT || 3700;


db.connect()
    .then(function (obj) {
       
        obj.done(); // success, release connection;
        app.listen(3700,function(){
            console.log(`API RESTFUL FAVORITOS FUNCIONANDO EN HTTP://LOCALHOST:${port}`);
            console.log("PRUEBA NODEMON");
        });    
        console.log('DATABASE WORKING ...');
        console.log('REST PERSONA PORT 3700 . . .');
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });


