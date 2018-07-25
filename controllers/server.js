const db = require('../pg-con');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const superSecret = 'ilovecesar';

function getAuthentication(req,res){
    let usuario = req.body.usuario;
    //let password = req.body.password;
    
    db.any('select * from public.usuario where usuario = $1',usuario)
        .then(function (data) {            
            console.log('ke pasaaaaa');
            if(Object.keys(data).length != 0){
                nueo = JSON.stringify(data);
                console.log('PASSWORD >>> ' + data[0].password);
                
                
                if (data[0].password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                  } else {
            
                    // if user is found and password is right
                    // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                  //admin: user.admin 
                  admin:true
                };
                    var token = jwt.sign(payload, superSecret, {
                      expiresIn : 60*60*24
                    });
            
                    // return the information including token as JSON
                    res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token
                    });
                  }
            }else{                
                res.status(404).send({message: 'USUARIO no encontrada'});    
            }            
        })
        .catch(function (error) {
            console.log('ke pasooooooo');
            res.status(500).send({message: 'Error en el servidor ' + error});
        });    
};

module.exports = {
    getAuthentication
}