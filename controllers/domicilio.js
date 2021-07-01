const Sequelize = require('sequelize');
const domicilio = require('../models').domicilio;
const cliente = require('../models').cliente;

module.exports = {

    create: function (req, res) {
        return domicilio
            .create({
                    "nombre": req.body.nombre,
                    "apellido": req.body.apellido,
                    "direccion": req.body.direccion,
                    "ciudad": req.body.ciudad,
                    "provincia": req.body.provincia,
                    "zipcode": req.body.zipcode,
                    "email": req.body.email,
                    "cellphone": req.body.cellphone,
                    "clienteId": req.body.clienteId
                },
            )
            .then(obj => res.status(201).send(obj))
            .catch(error => res.status(400).send(error))
    },

    edit(req, res) {
        return domicilio
            .update(
                {
                    "nombre": req.body.nombre,
                    "apellido": req.body.apellido,
                    "direccion": req.body.direccion,
                    "ciudad": req.body.ciudad,
                    "provincia": req.body.provincia,
                    "zipcode": req.body.zipcode,
                    "email": req.body.email,
                    "cellphone": req.body.cellphone
                },
                {
                    where: {id: req.params.id}
                }
            )
            .then(obj => res.status(200).send(obj))
            .catch(error => res.status(400).send(error))

    },


    delete(req, res) {
        return domicilio
            .destroy(
                {
                    where: {id: req.params.id}
                }
            )
            .then(dom => res.status(200).send(dom))
            .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return domicilio
            .findAll({})
            .then(doms => res.status(200).send(doms))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return domicilio
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dom => res.status(dom ? 200 : 404).send(dom))
            .catch(error => res.status(400).send(error))
    }
}

