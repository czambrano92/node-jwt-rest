const db = require('../pg-con');

function getAllCategoriaOcupacional(req, res) {        
    db.any('select * from public.categoria_ocupacional')
        .then(function (categoria) {            
            if(!categoria){
                res.status(404).send({message: 'Categorías ocupacionales no encontradas'});    
            }else{
                res.status(200).send(JSON.stringify(categoria));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor' + error});
        });
};

function getCategoriaOcupacional(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.categoria_ocupacional where codigo = $1',id)
        .then(function (categoria) {            
            if(Object.keys(categoria).length != 0){
                res.status(200).send(JSON.stringify({ccategoriaomuna}));
            }else{                
                res.status(404).send({message: 'Categoría Ocupacional no encontrada'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getAllCategoriaOcupacional,
    getCategoriaOcupacional
    
}