const Sequelize = require('sequelize');
const producto = require('../models').producto;
//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dmnligu6a', //reemplazar con sus credenciales
    api_key: '893294349767265', 
    api_secret: 'DQp1SU1HobPrRtJWccza314Kfmg'
});

module.exports = {
	/**
	 * Create a new producto
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
	// create(req, res) {
	// 	return producto
	// 		.findOrCreate({
	// 			where: {
	// 				titulo: req.body.titulo,
	// 			},
	// 			defaults: {
	// 				tag: req.body.tag,
	// 				precio: req.body.precio,
	// 				imageFileName: req.body.imageFileName
	// 			}
	// 		})
	// 		.then(producto => 
	// 			{
	// 				console.log(imageFileName);
	// 			if (producto.imageFileName!==''){
	// 				let imagen = 'imagenes/' + imageFileName;
    //                 cloudinary.uploader.upload(imagen, function(result) { 
    //                 console.log("Resultado",result);
					
	// 				// imageFileName: result.url
					
    //              //urlImg=result.url;
    //     })
	// 			}
	// 			res.status(200).send(producto)
	// 			})
	// 		.catch(error => res.status(400).send(error))
	// },

	async create (req, res) {

		console.log("ImgUser",req.body)
		// Id is necessary for the update
		if (!req.body.titulo) {
			return res.status(400).json({status: 400., message: "titulo must be present"})
		}
	
		let userImg = {
			titulo: req.body.titulo,
			imageFileName: req.body.imageFileName,
			tag: req.body.tag,
	       precio: req.body.precio,
		}
		
		try {
			if (userImg.imageFileName!=='')
			{
				//var newUserImg = await UserImgService.createUserImg(userImg);
				let imagen = 'imagenes/' + userImg.imageFileName;
            cloudinary.uploader.upload(imagen, function(result) { 
             console.log("Resultado",result);
			 
			 producto.findOrCreate(
				{where: {titulo: req.body.titulo},
				defaults: {
									tag: req.body.tag,
									precio: req.body.precio,
									imageFileName: result.url
									
								}
							}).catch(
				(err) => {
					console.log("Error: ", err);
				}
			);
			});
			}
			
			return res.status(201).json({ message: "Imagen cargada"});
			
		} catch (e) {
			console.log("error guardar imagen",e)
			return res.status(400).json({status: 400., message: e.message})
		}
	},

	// async create (req, res) {

	// 	console.log("ImgUser",req.body)
	// 	// Id is necessary for the update
	// 	if (!req.body.titulo) {
	// 		return res.status(400).json({status: 400., message: "titulo must be present"})
	// 	}
	
	// 	var userImg = {
	// 		titulo: req.body.titulo,
	// 		tag: req.body.tag,
	// 		precio: req.body.precio,
	// 		imageFileName: req.body.imageFileName
	// 	}
		
	// 	try {
	// 	// 	if (userImg.imageFileName!=='')
	// 	// 	{
	// 	// 		let imagen = 'imagenes/' + imageFileName;
	// 	// 		cloudinary.uploader.upload(imagen, function(result) { 
	// 	// 		console.log("Resultado",result);
	// 	// 		var newUserImg = new UserImg({      
	// 	// 			imageFileName: result.url
	// 	// 		})
	// 	// 	 //urlImg=result.url;
	//     // })
	// 	// 	}
			
	// 		return res.status(201).json({status: 201, message: "Imagen cargada"});
			
	// 	} catch (e) {
	// 		console.log("error guardar imagen",e)
	// 		return res.status(400).json({status: 400., message: e.message})
	// 	}
	// },



	 /**
	 * Editar un producto
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	edit(req, res) {
		return producto
	          .update(  

				 {  titulo: req.body.titulo,
					 tag: req.body.tag,
			        precio: req.body.precio},

		       {
				where: {id: req.body.id}
				}
			
		)
			  .then(producto => res.status(200).send(producto))
			  .catch(error => res.status(400).send(error))
		},


/**
	 * Eliminar un producto
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
 delete(req, res) {
	return producto
		  .destroy(  

		   {
			where: {id: req.body.id}
			}
		
	)
		  .then(producto => res.status(200).send("Producto eliminado"))
		  .catch(error => res.status(400).send(error))
	},



	/**
	 * Find all productos
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