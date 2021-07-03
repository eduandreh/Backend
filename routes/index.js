// Controllers
const usuariosController = require('../controllers/usuarios');
const clienteController = require('../controllers/cliente');
const productoController = require('../controllers/producto');
const ordenController = require('../controllers/orden');
const medioDePagoController = require('../controllers/medioDePago');
const domicilioController = require('../controllers/domicilio');
const Authorization = require('../auth/authorization');

module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: 'Buenisimo entramos en nuestra api',
	}));

	// Routes of Web Services
	// Users
	app.post('/api/usuarios/login', usuariosController.login);
	app.post('/api/usuarios/create', usuariosController.create);
	app.post('/api/usuarios/edit', usuariosController.edit);
	// app.post('/api/usuarios/delete', usuariosController.delete);
	app.get('/api/usuarios/list',Authorization, usuariosController.list);
	app.get('/api/usuarios/find/username/:username', usuariosController.find);

	//clientes

	app.post('/api/cliente/create', clienteController.create);
	app.post('/api/cliente/edit', clienteController.edit);
	//  app.post('/api/cliente/delete', clienteController.delete);
    app.get('/api/cliente/list', clienteController.list);

	//productos

	app.post('/api/producto/create', productoController.create);
	app.post('/api/producto/edit', productoController.edit);
	app.post('/api/producto/delete', productoController.delete);
    app.get('/api/producto/list', productoController.list);
	app.get('/api/producto/find', productoController.find);

	//Ordenes

	app.post('/api/orden', ordenController.create);
    app.get('/api/orden', ordenController.list);
	app.post('/api/orden/delete', ordenController.delete);

    //mediosDePago
	app.post('/api/mediodepago', medioDePagoController.create);
	app.put('/api/mediodepago/:id', medioDePagoController.edit);
	app.delete('/api/mediodepago/:id', medioDePagoController.delete);
	app.get('/api/mediodepago/list', medioDePagoController.list);
	app.get('/api/mediodepago/:id', medioDePagoController.find);

	//domicilios
	app.post('/api/domicilio', domicilioController.create);
	app.put('/api/domicilio/:id', domicilioController.edit);
	app.delete('/api/domicilio/:id', domicilioController.delete);
	app.get('/api/domicilio/list', domicilioController.list);
	app.get('/api/domicilio/:id', domicilioController.find);
};