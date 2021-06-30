const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const cliente = require('../models').cliente;
const usuarios = require('../models').usuarios;

module.exports = {
    /**
     * Create a new cliente
     *
     * @param {*} req
     * @param {*} res
     */
    create(req, res) {
        // Looking for the user
        // SELECT * FROM usuarios WHERE id = 1 OR username = 'Lucas
        const responseUsuario = usuarios.findOne({
            where: {
                [Op.or]: [{
                    fullname: req.body.user
                }, {
                    id: req.body.user
                }]
            }
        });

        Promise
            .all([responseUsuario])
            .then(responses => {
                return cliente
                    .create({
                        usuario_fullname: responses[0].fullname,
                        ubicacion: req.body.ubicacion,
                        telefono: req.body.telefono,
                    })
                    .then(cliente => res.status(200).send(cliente))
                    .catch(error => res.status(400).send(error))
            })
    },

    //Json: // {
//     "user":"5",
//     "ubicacion":"Salta, Argentina",
//     "telefono":"387446593"
// }

    edit(req, res) {
        return cliente
            .update(
                {
                    titulo: req.body.titulo,
                    tag: req.body.tag,
                    precio: req.body.precio
                },

                {
                    where: {id: req.body.id}
                }
            )
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error))
    },


// /**
//  * Eliminar un producto
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  */
// // delete(req, res) {
// // return cliente
// // 	  .destroy(  

// // 	   {
// // 		where: {id: req.body.id}
// // 		}

// // )
// // 	  .then(cliente => res.status(200).send("Cliente eliminado"))
// // 	  .catch(error => res.status(400).send(error))
// // },

    /**
     * List
     *
     * @param {*} _
     * @param {*} res
     */
    list(_, res) {
        return cliente
            .findAll({

                attributes: [

                    'usuario_fullname',
                    'ubicacion',
                    'telefono',
                    'createdAt'

                ]
            })
            .then(cliente => res.status(200).send(cliente))
            .catch(error => res.status(400).send(error))
    }

}