const db = require('../pg-con');

function getComunas(req, res) {
    
    
    db.any('select * from public.comuna')
        .then(function (comunas) {            
            if(!comunas){
                res.status(404).send({message: 'comuna no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify(comunas));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

function getComuna(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.comuna where comunacod = $1',id)
        .then(function (comuna) {            
            if(Object.keys(comuna).length === 0){
                res.status(404).send({message: 'Comuna no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify({comuna}));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

module.exports = {
    getComunas,
    getComuna
}