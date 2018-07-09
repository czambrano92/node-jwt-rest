const db = require('../pg-con');

function getCatalogoDireccion(req, res) {        
    let id_persona = req.params.id_persona;
    
    db.any('select * from public.catalogo_direccion where id_persona = $1',id_persona)
        .then(function (catalogo_direccion) {            
            if(Object.keys(catalogo_direccion).length != 0){
                res.status(200).send(JSON.stringify({catalogo_direccion}));
            }else{                
                res.status(404).send({message: 'Direcciones no encontradas'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor ' + error});
        });
};



module.exports = {
    getCatalogoDireccion
    
}