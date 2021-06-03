// Controllers
const usuariosController = require('../controllers/usuarios');
const clienteController = require('../controllers/cliente');
const productoController = require('../controllers/producto');
//const ordenController = require('../controllers/orden');

module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: 'Buenisimo entramos en nuestra api',
	}));

	// Routes of Web Services
	// Users
	app.post('/api/usuarios/create', usuariosController.create);
	app.get('/api/usuarios/list', usuariosController.list);
	app.get('/api/usuarios/find/username/:username', usuariosController.find);

	//clientes

	app.post('/api/cliente/create', clienteController.create);
    app.get('/api/cliente/list', clienteController.list);

	//clientes

	app.post('/api/producto/create', productoController.create);
    app.get('/api/producto/list', productoController.list);
	app.get('/api/producto/find', productoController.find);

	//Ordenes

	//app.post('/api/orden/create', ordenController.create);
    //app.get('/api/orden/list', ordenController.list);
};