const db = require('../pg-con');

function getAllGenero(req, res) {        
    db.any('select * from public.genero')
        .then(function (genero) {            
            if(!genero){
                res.status(404).send({message: 'Generos no encontrados'});    
            }else{
                res.status(200).send(JSON.stringify(genero));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getGenero(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.genero where codigo = $1',id)
        .then(function (genero) {            
            if(Object.keys(genero).length != 0){
                res.status(200).send(JSON.stringify({genero}));
            }else{                
                res.status(404).send({message: 'Region no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllGenero,
    getGenero
    
}