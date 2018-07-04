const db = require('./pg-con');

function getPersonas(req, res) {
    db.any('select * from urgencia.rol_funcionario where rut_funcionario = $1', '18062538-0')
        .then(function (data) {
            console.log(data);
            res.status(200).send({data});
        })
        .catch(function (error) {
            console.log('error en conexión bd.' + error);
        });
};

module.exports = {
    getPersonas
}