const db = require('../pg-con');

function getAllComplementoDireccion(req, res) {    
    
    db.any('select * from public.complemento_direccion *')
        .then(function (comuna) {            
            if(Object.keys(comuna).length != 0){
                res.status(200).send(JSON.stringify({comuna}));
            }else{                
                res.status(404).send({message: 'Agenda no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getComplementoDireccion(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.complemento_direccion where codigo = $1',id)
        .then(function (comuna) {            
            if(Object.keys(comuna).length != 0){
                res.status(200).send(JSON.stringify({comuna}));
            }else{                
                res.status(404).send({message: 'Complemento direccion no encontrado'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};



module.exports = {
    getAllComplementoDireccion,
    getComplementoDireccion
}