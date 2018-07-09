const db = require('../pg-con');

function getNivelesInstruccion(req, res) {        
    db.any('select * from public.nivel_instruccion')
        .then(function (niveles) {            
            if(!niveles){
                res.status(404).send({message: 'comuna no encontrada'});    
            }else{
                res.status(200).send(JSON.stringify(niveles));
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

function getNivelInstruccion(req, res) {
    let id = req.params.id;
    
    db.any('select * from public.nivel_instruccion where codigo = $1',id)
        .then(function (nivelinstruccion) {            
            if(Object.keys(nivelinstruccion).length != 0){
                res.status(200).send(JSON.stringify({nivelinstruccion}));                
            }else{
                res.status(404).send({message: 'Nivel de instrucción no encontrado'});    
            }            
        })
        .catch(function (error) {
            res.status(500).send({message: 'Error en el servidor'});
        });
};

module.exports = {
    getNivelesInstruccion,
    getNivelInstruccion
}