var express = require("express");
var router = express.Router();
const controller = require("../controllers").UsuarioController;

router.get("/", function (req, res) {
  controller.listAll(req, res);
});
router.get("/id/:id", function (req, res) {
  controller.readRecord(req, res);
});

router.post("/login", function (req, res) {
  controller.Login(req, res);
});

router.post("/", function (req, res) {
  controller.createRecord(req, res);
});

router.put("/", function (req, res) {
  controller.updateRecord(req, res);
});

router.put("/perfil/id/:id", function (req, res) {
  controller.updateRecordPerfil(req, res);
});






// router.get('/', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.listAll(req, res);
// });
//
// router.get('/test', utils.basicAuth(values.read[0], values.read[1]), function(req, res) {
//     controller.test(req, res);
// });
//
// router.get('/search', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.searchRecords(req, res);
// });
//
// router.get('/id/:id', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.readRecord(req, res);
// });
//
// router.get('/email/:email', utils.basicAuth(values.read[0], values.read[1]), function(req, res) {
//     controller.verifyEmail(req, res);
// });
//
// router.post('/', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.createRecord(req, res);
// });
//
// router.post('/activarUsuario', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
//     controller.activarUsuario(req, res);
// });
//
// router.post('/registro', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
//     controller.registrarNuevoUsuario(req, res);
// });
//
// router.put('/', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.updateRecord(req, res);
// });
//
// router.put('/perfil', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.updateRecordPerfil(req, res);
// });
//
// router.put('/actualizarPermisos', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.updateUsuarioEmpresa(req, res);
// });
//
// router.delete('/id/:id', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.deleteRecord(req, res);
// });
//
// router.put('/actualizarTutorial/:id', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.tutorialVistoReq(req, res);
// });
//
// router.put('/actualizarTutorialNuevaVenta/:id', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.tutorialNuevaVentaVistoReq(req, res);
// });
//
// router.put('/actualizarTutorialDetalleVenta/:id', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.tutorialDetalleVentaVistoReq(req, res);
// });
//
// // * * * Contraseña * * *
// router.put('/password', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.actualizarContrasenaReq(req, res, false);
// });
//
// router.put('/passwordPerfil', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.actualizarContrasenaReq(req, res, true);
// });
//
// // * * * Autenticación * * *
// router.post('/cambiarLoginEmpresa', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.cambiarLoginEmpresa(req, res);
// });
//
// router.post('/loginWeb', utils.basicAuth(values.write[0], values.write[1]), function (req, res) {
//     controller.login(req, res, 'web');
// });
//
// router.post('/verificarToken', utils.basicAuth(values.write[0], values.write[1]), function (req, res) {
//     controller.verificarToken(req, res);
// });
//
// // * * * Reset Contraseña * * *
// router.post('/solicitarReinicioPassword', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
//     controller.solicitarReinicioPassword(req, res);
// });
//
// router.post('/recuperarPasswordCodigoSeguridad', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
//     controller.recuperarPasswordCodigoSeguridad(req, res);
// });
//
// // * * * Eliminación de relación * * *
// router.get('/verificarSalida/:id', auth.validarTokenPermisos([auth.permisos.CUALQUIERA]), function(req, res) {
//     controller.verificarSalidaDeEmpresa(req, res);
// });
//
// router.delete('/eliminarRelacion/:id', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.salirDeEmpresa(req, res);
// });
//
// router.post('/registrarPagoFEL', auth.validarTokenPermisos([auth.permisos.ADMINISTRADOR]), function(req, res) {
//     controller.registrarPagoFELReq(req, res);
// });

module.exports = router;
