const Sequelize = require('sequelize');
const usuarios = require('../models').usuarios;
const jwt = require("jsonwebtoken");

module.exports = {

    /**
     * Login
     *
     *
     *
     * @param {*} req
     * @param {*} res
     */
    async login(req, res) {
        const {email, password} = req.body;

        const userWithEmail = await usuarios.findOne({where: {email}}).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );

        if (!userWithEmail) {
            return res
                .status(400)
                .json({message: "Email no encontrado en nuestra base de datos."});
        }

        if (userWithEmail.password !== password) {
            return res
                .status(404)
                .json({message: "Contraseña incorecta"});
        }

        if (userWithEmail.password === password) {
            const token = jwt.sign(
                {email: userWithEmail.email},
                '123456', {
                    expiresIn: 86400 // expires in 24 hours
                });
            return res
                .status(200)
                .json({userWithEmail, message: "Bien!", token: token});
        }

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
                    password: req.body.password,
                    admin: req.body.admin
                }
            })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error))


    },

    edit(req, res) {
        return usuarios
            .update(
                {
                    email: req.body.email,
                    fullname: req.body.fullname,
                    password: req.body.password
                },

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

