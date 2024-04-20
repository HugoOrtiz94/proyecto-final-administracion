const db = require("../models/index").sequelize;
const Op = require("../models/index").Sequelize.Op;

// * * * Generales * * *
const Config = require("../config_server");
const bycrypt = require("bcryptjs");
const { Usuario } = require("../models");
const { where } = require("sequelize");
const e = require("express");
// * * * Models * * *
const Curso = require("../models").Curso;
const DetalleCurso = require("../models").DetalleCurso;
const UsuarioCurso = require("../models").UsuarioCurso;
const Recurso = require("../models").Recurso;


// * * * Controllers * * *
module.exports = {
  async listAll(req, res) {
    var transaction = await db.transaction();
    try {
      const cursos = await Curso.findAll({
        where: {
          isDeleted: false,
        },
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
  async readRecord(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.params;
      const result = await Curso.findOne({ where: { id: id } });

      //Cantidad de cursos
      let cantDetCur = await DetalleCurso.count({
        where: { CursoId: id, isDeleted: false },
      });
      if (!cantDetCur) {
        cantDetCur = 0;
      }

      await transaction.commit();
      return res
        .status(201)
        .send({ error: false, result: result, detallesCant: cantDetCur });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
  async createRecord(req, res) {
    var transaction = await db.transaction();
    try {
      const {
        nombre,
        duracion,
        categoria,
        fechaInicia,
        fechaFinaliza,
        descripcion,
        registroRequerido,
        requisitos,
        estado,
      } = req.body;

      const result = await Curso.create(
        {
          nombre: nombre,
          duracion: duracion,
          categoria: categoria,
          fechaInicia: fechaInicia,
          fechaFinaliza: fechaFinaliza,
          descripcion: descripcion,
          registroRequerido: registroRequerido,
          requisitos: requisitos,
          isDeleted: false,
          estado: estado,
          tamano: 0,
        },
        { transaction: transaction }
      );

      if (result) {
        const cantDetCur = await DetalleCurso.count({
          where: { CursoId: result.id },
        });
        if (cantDetCur && cantDetCur > 0) {
          const updateCurso = await Curso.update(
            {
              tamano: cantDetCur,
            },
            { transaction: transaction }
          );
        }
      }
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
  async updateRecord(req, res) {
    var transaction = await db.transaction();
    try {
      let { body } = req;

      const result = await Curso.update(
        {
          ...body,
        },
        {
          where: {
            id: body.id,
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

  async readRecordMisCursos(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.query;
      const inscripciones = await UsuarioCurso.findAll({
        where: {
          UsuarioId: id,
          isDeleted: false,
        }
      });

      let cursos = [];
      for (let i = 0; i < inscripciones.length; i++) {
        const curso = await Curso.findOne({
          where: {
            id: inscripciones[i].CursoId,
          },
        });
        cursos.push(curso);
      }

      await transaction.commit();
      return res
        .status(201)
        .send({ error: false, result: cursos });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },


  async createRecordDetalles(req, res) {
    var transaction = await db.transaction();
    try {
      const { body } = req;

      const cantDetCur = await DetalleCurso.count({
        where: { CursoId: body.CursoId },
      });

      const result = await DetalleCurso.create(
        {
          ...body,
          isDeleted: false,
          restringido: false,
          posicion: cantDetCur + 1,
        },
        { transaction: transaction }
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
  async updateRecordDetalles(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.params;
      let { body } = req;

      const result = await DetalleCurso.update(
        {
          ...body,
        },
        {
          where: {
            id: id,
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

  async listAllDetalles(req, res) {
    try {
      const { CursoId } = req.query;
      const result = await DetalleCurso.findAll({
        where: { CursoId: CursoId, isDeleted: false },
      });
      return res.status(201).send({ error: false, result: result });
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async readRecordInscripcion(req, res) {
    var transaction = await db.transaction();
    try {
      let id = req.params.id;
      let { idCurso } = req.query;
      const result = await UsuarioCurso.findOne({
        where: {
          UsuarioId: id,
          CursoId: idCurso,
          isDeleted: false

        },
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

  async createRecordInscripcion(req, res) {
    var transaction = await db.transaction();
    try {
      const { body } = req;

      const cantDetCur = await UsuarioCurso.count({
        where: { CursoId: body.CursoId, isDeleted: false },
      });

      const result = await UsuarioCurso.create(
        {
          ...body,
          isDeleted: false,
          activo: true,
          progresoUno: 0,
          progresoDos: cantDetCur,
        },
        { transaction: transaction }
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

  async readRecordDetalles(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.params;
      const result = await DetalleCurso.findOne({ where: { id: id } });
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


  async createRecordRecurso(req, res) {
    var transaction = await db.transaction();
    try {
      const { body } = req;

      const result = await Recurso.create(
        {
          ...body,
          isDeleted: false,
        },
        { transaction: transaction }
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


  async obtenerRecursos(req, res) {
    var transaction = await db.transaction();
    try {

      const result = await Recurso.findAll({
        where: { isDeleted: false },
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

  async eliminarRecurso(req, res) {
    var transaction = await db.transaction();
    try {
      let { id } = req.params;
      let { body } = req;

      const result = await Recurso.update(
        {
          ...body,
        },
        {
          where: {
            id: id,
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
