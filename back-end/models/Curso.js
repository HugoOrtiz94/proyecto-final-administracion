"use strict";

module.exports = function (sequelize, DataTypes) {
  var Curso = sequelize.define(
    "Curso",
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      duracion: { type: DataTypes.STRING, allowNull: true },
      categoria: { type: DataTypes.STRING, allowNull: true },
      fechaInicia: { type: DataTypes.DATE, allowNull: true },
      fechaFinaliza: { type: DataTypes.DATE, allowNull: true },
      descripcion: { type: DataTypes.TEXT, allowNull: true },
      registroRequerido: { type: DataTypes.BOOLEAN, allowNull: true },
      requisitos: { type: DataTypes.TEXT, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
      estado: { type: DataTypes.INTEGER, allowNull: false },
      imagen: { type: DataTypes.TEXT, allowNull: true },
      adjunto: { type: DataTypes.TEXT, allowNull: true },
      tamano: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: true,
      tableName: "Cursos",
    }
  );

  Curso.associate = function (models) {
    Curso.hasMany(models.UsuarioCurso, {
      foreignKey: "CursoId",
    });
    Curso.hasMany(models.DetalleCurso, {
      foreignKey: "CursoId",
    });
    Curso.hasMany(models.ActividadCurso, {
      foreignKey: "CursoId",
    });
  };
  return Curso;
};
