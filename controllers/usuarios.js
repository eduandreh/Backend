const Sequelize = require('sequelize');
const usuarios = require('../models').usuarios;

module.exports = {

	/**
	 * Login
	 * 
	 *
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	login(req, res) {
		return usuarios
				.findOne({
					where: {
						email: req.body.email,
						password: req.body.password,
					}
            })
			 
			.then(usuarios => {if (usuarios.length) {

				return res.status(404).send(error); }

				else { return res.status(200).json({usuarios, status: 200}) }
			  })
			
			  .catch(error => res.status(400).json({status: 400, message: "error"}))

			
	},

	// JSON: {
    //     "email":"pedro@gmail.com",
    //     "fullname": "Pedro Lopez",
    //     "password": "1234"
	// 	}


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

	edit(req, res) {
		return usuarios
	          .update(  

				 {  email: req.body.email,
					fullname: req.body.fullname,
			        password: req.body.password},

		       {
				where: {id: req.body.id}
				},
				console.log(res)
		)
			  .then(usuarios => res.status(200).send(usuarios))
			  .catch(error => res.status(400).send(error))
			  
		},


// /**
// 	 * Eliminar un usuarios
// 	 * 
// 	 * @param {*} req 
// 	 * @param {*} res 
// 	 */
//  delete(req, res) {
// 	return usuarios
// 		  .destroy(  

// 		   {
// 			where: {id: req.body.id}
// 			}
		
// 	)
// 		  .then(usuarios => res.status(200).send("usuario eliminado"))
// 		  .catch(error => res.status(400).send(error))
// 	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM usuarios
	 * 
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

