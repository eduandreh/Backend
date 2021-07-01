const db = require("../models");
const orden = require('../models').orden;
const producto = require('../models').producto;
const cliente = require('../models').cliente;
const domicilio = require('../models').domicilio;
const medioDePago = require('../models').medioDePago;

module.exports = {

    async create(req, res) {
        let clienteObj = (await cliente.findOne({usuario_fullname: 1}))
        if (!clienteObj) {
            return res.status(400).send("client does not exist")
        }
        clienteObj = clienteObj.get({plain: true});

        let ordenObj = orden.build({
            status: req.body.status,
            clienteId: clienteObj.id
        }, {
            include: [domicilio, medioDePago]
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

                let domicilioObj = undefined;
                let medioObj = undefined;

                if(req.body.domicilio.domicilioId){
                    domicilioObj = await domicilio.findByPk(req.body.domicilio.domicilioId)
                }
                if(!domicilioObj){
                    domicilioObj = domicilio.build(req.body.domicilio);
                    await domicilioObj.save({transaction: t});
                    await domicilioObj.setCliente(clienteObj.id, {transaction: t});

                }

                if(req.body.medioDePago.medioDePagoId){
                    medioObj = await medioDePago.findByPk(req.body.medioDePago.medioDePagoId)
                }
                if(!medioObj){
                    medioObj = medioDePago.build(req.body.medioDePago)
                    await medioObj.save({transaction: t});
                    await medioObj.setCliente(clienteObj.id, {transaction: t});

                }

                await orden.setDomicilio(domicilioObj.id, {transaction: t});
                await orden.setMedioDePago(medioObj.id, {transaction: t});

                await t.commit()
                return res.status(200).send(orden)
            })
            .catch(error => {
                t.rollback()
                console.log(error)
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