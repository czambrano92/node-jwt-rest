const db = require('../pg-con');

function getAllLimite(req, res) {        
    db.any('select * from public.limite_urbano_censal')
        .then(function (limite) {            
            if(!limite){
                res.status(404).send({message: 'Limites no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(limite));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getLimite(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.limite_urbano_censal where codigo = $1',id)
        .then(function (limite) {            
            if(Object.keys(limite).length != 0){
                res.status(200).send(JSON.stringify({limite}));
            }else{                
                res.status(404).send({message: 'Limite no encontrado'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllLimite,
    getLimite
}