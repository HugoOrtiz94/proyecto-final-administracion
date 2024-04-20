var express = require("express");
var router = express.Router();
const controller = require("../controllers").CursoController;

router.get("/", function (req, res) {
  controller.listAll(req, res);
});
router.get("/id/:id", function (req, res) {
  controller.readRecord(req, res);
});

router.post("/", function (req, res) {
  controller.createRecord(req, res);
});

router.put("/:id", function (req, res) {
  controller.updateRecord(req, res);
});



router.get("/miscursos", function (req, res) {
  controller.readRecordMisCursos(req, res);
});

//Detalle

router.get("/detalles/id/:id", function (req, res) {
  controller.readRecordDetalles(req, res);
});

router.get("/detalles/buscar", function (req, res) {
  controller.listAllDetalles(req, res);
});
router.post("/detalles", function (req, res) {
  controller.createRecordDetalles(req, res);
});
router.put("/detalles/:id", function (req, res) {
  controller.updateRecordDetalles(req, res);
});

//Inscripcion
router.get("/inscripcion/id/:id", function (req, res) {
  controller.readRecordInscripcion(req, res);
});

router.post("/inscripcion", function (req, res) {
  controller.createRecordInscripcion(req, res);
});

//Recursos
router.post("/recursoCrear", function (req, res) {
  controller.createRecordRecurso(req, res);
});

router.get("/recursoObtener", function (req, res) {
  controller.obtenerRecursos(req, res);
});

router.put("/recursoEliminar/:id", function (req, res) {
  controller.eliminarRecurso(req, res);
});






module.exports = router;
