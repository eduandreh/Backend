const Sequelize = require('sequelize');
const producto = require('../models').producto;

module.exports = {
	/**
	 * Create a new producto
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return producto
			.findOrCreate({
				where: {
					titulo: req.body.titulo,
				},
				defaults: {
					tag: req.body.tag,
					precio: req.body.precio,
				}
			})
			.then(producto => res.status(200).send(producto))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find all games
	 * 
	 * Example: SELECT * FROM usuarios
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return producto
			.findAll({})
			.then(producto => res.status(200).send(producto))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table games
	 * 
	 * Example: SELECT * FROM juegos WHERE name = 'Pac Man'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	find(req, res) {
		return producto
			.findOne({
				where: {
					titulo: req.body.titulo
				}
			})
			.then(producto => res.status(200).send(producto))
			.catch(error => res.status(400).send(error))
	}
}