const Sequelize = require('sequelize');
const orden = require('../models').orden;

module.exports = {
	/**
	 * Create a new orden
	 * Ejemplo Json: 
	 * {
    "titulo":"Filete Merluza",
    "tag":"Linea Articos",
    "precio":"390"
      }
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return orden
			.findOrCreate({
				where: {
					nro_orden: req.body.nro_orden,
				},
				defaults: {
					status: req.body.status,
					lista_productos: req.body.lista_productos,
                    cantidades: req.body.cantidades
				}
			})
			.then(orden => res.status(200).send(orden))
			.catch(error => res.status(400).send(error))
	}
}