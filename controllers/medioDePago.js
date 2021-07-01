const Sequelize = require('sequelize');
const medioDePago = require('../models').medioDePago;
const cliente = require('../models').cliente;

module.exports = {

    create: function (req, res) {
        return medioDePago
            .create({
                    "tarjeta": req.body.ccbrand,
                    "numero": req.body.ccnumber,
                    "cvv": req.body.ccCVV,
                    "expiry": req.body.ccexpiry,
                    "titular": req.body.ccname,
                    "clienteId": req.body.clienteId
                },
            )
            .then(obj => res.status(201).send(obj))
            .catch(error => res.status(400).send(error))
    },

    edit(req, res) {
        return medioDePago
            .update(
                {
                    "tarjeta": req.body.ccbrand,
                    "numero": req.body.ccnumber,
                    "cvv": req.body.ccCVV,
                    "expiry": req.body.ccexpiry,
                    "titular": req.body.ccname,
                },
                {
                    where: {id: req.params.id}
                }
            )
            .then(obj => res.status(200).send(obj))
            .catch(error => res.status(400).send(error))

    },


    delete(req, res) {
        return medioDePago
            .destroy(
                {
                    where: {id: req.params.id}
                }
            )
            .then(ibj => res.status(200).send("medioDePago eliminado"))
            .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return medioDePago
            .findAll({})
            .then(medios => res.status(200).send(medios))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return medioDePago
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(medio => res.status(medio ? 200 : 404).send(medio))
            .catch(error => res.status(400).send(error))
    }
}

