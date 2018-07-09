const db = require('../pg-con');

function getPaises(req, res) {        
    db.any('select * from public.pais')
        .then(function (pais) {            
            if(!pais){
                res.status(404).send({message: 'Paises no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(pais));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getPais(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.pais where codigo = $1',id)
        .then(function (pais) {            
            if(Object.keys(pais).length != 0){
                res.status(200).send(JSON.stringify({pais}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getPais,
    getPaises
}