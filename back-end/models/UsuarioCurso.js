"use strict";

module.exports = function (sequelize, DataTypes) {
  var UsuarioCurso = sequelize.define(
    "UsuarioCurso",
    {
      activo: { type: DataTypes.BOOLEAN, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
      progresoUno: { type: DataTypes.INTEGER, allowNull: true },
      progresoDos: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: true,
      tableName: "UsuariosCursos",
    }
  );
  UsuarioCurso.associate = function (models) {
    UsuarioCurso.belongsTo(models.Usuario, {
      foreignKey: "UsuarioId",
    });
    UsuarioCurso.belongsTo(models.Curso, {
      foreignKey: "CursoId",
    });
  };
  return UsuarioCurso;
};
