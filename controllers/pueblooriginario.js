const db = require('../pg-con');

function getPueblos(req, res) {
    db.any('select * from public.pueblo_indigena')
        .then(function (pueblos) {
            if (!pueblos) {
                res.status(404).send({ message: 'Pueblos no encontrados' });
            } else {
                res.status(200).send(JSON.stringify(pueblos));
            }
        })
        .catch(function (error) {
            res.status(500).send({ message: 'Error en el servidor' });
        });
};

function getPueblo(req, res) {
    let id = req.params.id;

    db.any('select * from public.pueblo_indigena where codigo = $1', id)
        .then(function (pueblo) {
            if (Object.keys(pueblo).length != 0) {
                res.status(200).send(JSON.stringify({ pueblo }));
            } else {
                res.status(404).send({ message: 'Pueblo no encontrado' });
            }
        })
        .catch(function (error) {
            res.status(500).send({ message: 'Error en el servidor' });
        });
};

module.exports = {
    getPueblos,
    getPueblo
}