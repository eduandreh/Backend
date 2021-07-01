const db = require("../models");
const orden = require('../models').orden;
const producto = require('../models').producto;
const cliente = require('../models').cliente;
const ordenProducto = require('../models').ordenProducto;


module.exports = {

    async create(req, res) {
        let clienteObj = (await cliente.findByPk(1)).get({plain: true})

        let ordenObj = orden.build({
            status: req.body.status,
            clienteId: clienteObj.id,
        });

        const t = await db.sequelize.transaction();

        ordenObj.save({transaction: t})
            .then(async orden => {
                for (const reqProd of req.body.productos) {
                    let prodObj = (await producto.findByPk(reqProd.productoId)).get({plain: true})

                    await orden.addProducto(prodObj.id, {
                        through: {
                            cantidad: reqProd.cantidad,
                            precio: prodObj.precio,
                            ordenNroOrden: ordenObj.nro_orden
                        },
                        transaction: t
                    })
                }

                await t.commit()
                return res.status(200).send(ordenObj)
            })
            .catch(error => {
                t.rollback()
                res.status(400).send(error)
            });

    },

    list(_, res) {
        return orden
            .findAll({

                include: producto
            })
            .then(orden => res.status(200).send(orden))
            .catch(error => res.status(400).send(error))
    }


}