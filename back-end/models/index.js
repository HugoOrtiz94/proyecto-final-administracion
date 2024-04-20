"use strict";

var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "production";
var configProd = require(__dirname + "/../config_db.json")[env];
var db = {};
const debugDB = require("../config_server").debugDB;
var config = debugDB ? configProd : configProd;


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var options = {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    operatorsAliases: "0",
  };

  options.define = {
    charset: "utf8",
    collate: "utf8_general_ci",
  };
  options.dialectOptions = {
    decimalNumbers: true,
  };

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    options
  );
}

const models = [
  require("./ActividadCurso")(sequelize, Sequelize),
  require("./Curso")(sequelize, Sequelize),
  require("./ActividadUsuario")(sequelize, Sequelize),
  require("./Usuario")(sequelize, Sequelize),
  require("./DetalleCurso")(sequelize, Sequelize),
  require("./UsuarioCurso")(sequelize, Sequelize),
  require("./Recursos")(sequelize, Sequelize),
];

models.forEach((model) => {
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
