let express = require("express");
let router = express.Router();
let version = require("../config_server").version;

//Required routes
const Usuario = require("./Usuario");
const Curso = require("./Curso");

//Registered routes
router.use("/usuarios", Usuario);
router.use("/cursos", Curso);

router.get("/", function (req, res) {
  res.status(200).send({
    message: "Welcome to the  API - v" + version,
  });
});

module.exports = router;
