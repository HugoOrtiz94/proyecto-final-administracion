const axios = require("axios");
const db = require("../models/index").sequelize;
const Op = require("../models/index").Sequelize.Op;

// * * * Generales * * *
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../config_server");
const { Curso } = require("../models");
// * * * Models * * *
const Usuario = require("../models").Usuario;

// * * * Controllers * * *
module.exports = {
  async listAll(req, res) {
    var transaction = await db.transaction();
    try {
      const cursos = await Usuario.findAll({
        where: { isDeleted: false },
      });
      await transaction.commit();
      return res.status(201).send({ error: false, result: cursos });
    } catch (error) {
      await transaction.rollback();
      return res.status(404).send({
        error: true,
        message: error.message,
      });
    }
  },
  async createRecord(req, res) {
    var transaction = await db.transaction();
    try {
      let { nombres, apellidos, correo, contrasena } = req.body;

      let emailUsuario = await Usuario.findOne({
        where: { email: correo },
      });
      if (emailUsuario)
        throw new Error(
          "El correo electrónico especificado ya está asociado a otra cuenta, por favor utilice otro."
        );

      await crearUsuarioChat(
        correo,
        nombres + " " + apellidos,
        "googleregoj12"
      );
      const result = await Usuario.create(
        {
          nombres: nombres,
          apellidos: apellidos,
          email: correo,
          hash: bycrypt.hashSync(contrasena, 10),
          activo: true,
          isDeleted: false,
          rol: "1",
        },
        { transaction: transaction }
      );

      await transaction.commit();
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      await transaction.rollback();
      return res.status(404).send({
        error: true,
        message: error.message,
      });
    }
  },

  async Login(req, res) {
    var transaction = await db.transaction();
    try {
      let { email, contrasena } = req.body;
      if (email) email = email.trim();

      // Buscar usuario
      let resUsuario = await Usuario.findOne({
        where: {
          email: email,
          activo: true,
          isDeleted: false,
        },
      });
      if (!resUsuario) {
        throw new Error(
          "Error al iniciar sesión, correo o contraseña no coinciden."
        );
      }

      let hashCompare = bycrypt.compareSync(contrasena, resUsuario.hash);
      if (!hashCompare) {
        throw new Error(
          "Error al iniciar sesión, correo o contraseña no coinciden."
        );
      }

      let token = jwt.sign({ UsuarioId: resUsuario.id }, Config.secret, {
        expiresIn: 86400,
      });

      let result = {
        id: resUsuario.id,
        username: resUsuario.nombres,
        email: resUsuario.email,
        accessToken: token,
        nombres: resUsuario.nombres,
        apellidos: resUsuario.apellidos,
        chatSecreto: "G;8[Vbz<%EFe=t[",
        rol: resUsuario.rol,
      };

      await transaction.commit();
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({ error: true, message: error.message });
    }
  },

  async updateRecord(req, res) {
    var transaction = await db.transaction();
    try {
      let RegistroId = req.body.id;
      let { isDeleted, activo, rol } = req.body;
      let data = {};
      if (isDeleted != undefined) data.isDeleted = isDeleted;
      if (activo != undefined) data.activo = activo;
      if (rol != undefined) data.rol = rol;

      const result = await Usuario.update(data, {
        where: {
          id: RegistroId,
        },
        transaction: transaction,
      });
      await transaction.commit();
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async readRecord(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.params;
      const result = await Usuario.findOne({ where: { id: id } });
      await transaction.commit();
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async updateRecordPerfil(req, res) {
    var transaction = await db.transaction();
    try {
      let UsuarioId = req.params.id;
      let { body } = req;

      const result = await Usuario.update(
        {
          ...body,
        },
        {
          where: {
            id: UsuarioId,
          },
          transaction: transaction,
        }
      );
      await transaction.commit();
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
};

// * * * Utilidades * * *
async function crearUsuarioChat(correo, nombres, key) {
  try {
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: correo,
        secret: key,
        first_name: nombres,
      },
      {
        headers: {
          "private-key": "6ca31fb4-5bee-41bd-a099-d1d36bbca187",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
}
