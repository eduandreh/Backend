const Sequelize = require('sequelize');
const usuarios = require('../models').usuarios;

module.exports = {

	/**
	 * Create a new user validate before if not exists
	 * 
	 *
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return usuarios
			.findOrCreate({
				where: {
					email: req.body.email,
				},
                defaults: {
				email: req.body.email,
                fullname: req.body.fullname,
				password: req.body.password
                }
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM usuarios
	 * JSON: {
        "email":"pedro@gmail.com",
        "fullname": "Pedro Lopez",
        "password": "1234"
		}
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return usuarios
			.findAll({})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table users
	 * 
	 * Example: SELECT * FROM usuarios WHERE username = 'Lucas'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	find(req, res) {
		return usuarios
			.findOne({
				where: {
					email: req.body.email
				}
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	}
}

