const express = require("express");
const http = require("http");
const app = express();
const config = require("./config_server");
const index = require("./routes/index");
const cors = require("cors");
const db = require("./models");

const configPostgres = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  port: config.port,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
console.log("Configuración - Google Cloud - Postgres:", configPostgres);

const configOracle = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  port: config.port,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
console.log("Configuración - Oracle SQL:", configOracle);

const configWS = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  port: config.port,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
console.log("Configuración  - Windows Server:", configWS);

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

let port = normalizePort(process.env.PORT || config.port);
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", index);

app.use("/", function (req, res) {
  res.status(200).send({
    message: "Estado correcto",
  });
});

//db.sequelize.sync({ alter: true });

let server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
