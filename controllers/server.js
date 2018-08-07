const db = require('../pg-con');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const superSecret = 'ilovecesar';

function getAuthentication(req,res){
    let rut = req.body.rut;
    //let password = req.body.password;
    
    db.any('select * from control_acceso.usuario where rut = $1',rut)
        .then(function (data) {                        
            if(Object.keys(data).length != 0){
                nueo = JSON.stringify(data);                                
                if (data[0].clave != req.body.clave) {
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
                      expiresIn : 60*15
                    });
            
                    // return the information including token as JSON
                    res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      usuario: data[0].usuario,
                      token: token
                    });
                  }
            }else{                
                res.status(404).send({success: false,message: 'USUARIO no encontrado'});    
            }            
        })
        .catch(function (error) {            
            res.status(500).send({success: false,message: 'Error en el servidor ' + error});
        });    
};

module.exports = {
    getAuthentication
}