const db = require('../pg-con');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const superSecret = 'ilovecesar';

function getAuthentication(req,res){
    //recibe rut y clave por el body en un post
    let rut = req.body.rut;    
    
    db.any('select * from control_acceso.usuario where rut = $1',rut)
        .then(function (data) {                        
            if(Object.keys(data).length != 0){                
                /// verifica contraseña
                if (data[0].clave != req.body.clave) {
                    res.json({ success: false, message: 'Autenticacion fallida, clave erronea.' });
                  } else {
                // si es valida la credencial            
                //completar datos a gusto
                const payload = {                  
                  admin:true,
                  user: data[0].id,
                  rut: data[0].rut
                };
                // crear token
                    var token = jwt.sign(payload, superSecret, {
                      expiresIn : 60*15
                    });
            
                    // retorna la información y el token como json
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