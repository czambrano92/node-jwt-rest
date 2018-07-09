const db = require('../pg-con');

function getFichaInstitucion(req, res) {
    let id_persona = req.params.id_persona;

    db.any('select * from public.ficha_institucion where id_persona = $1', id_persona)
        .then(function (comuna) {
            if (Object.keys(comuna).length != 0) {
                res.status(200).send(JSON.stringify({ comuna }));
            } else {
                res.status(404).send({ message: 'Region no encontrada' });
            }
        })
        .catch(function (error) {
            res.status(500).send({ message: 'Error en el servidor ' + error });
        });
};


module.exports = {
    getFichaInstitucion
}