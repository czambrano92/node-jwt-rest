const db = require('../pg-con');

function getPueblos(req, res) {
    
    
    db.any('select * from public.pueblooriginario')
        .then(function (pueblos) {            
            if(!pueblos){
                res.status(404).send({message: 'comuna no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify(pueblos));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

function getPueblo(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.pueblooriginario where pueoricod = $1',id)
        .then(function (pueblo) {            
            if(Object.keys(pueblo).length != 0){
                res.status(200).send(JSON.stringify({pueblo}));
            }else{                
                res.status(404).send({message: 'Comuna no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

module.exports = {
    getPueblos,
    getPueblo
}