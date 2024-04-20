"use strict";

module.exports = function (sequelize, DataTypes) {
  var DetalleCurso = sequelize.define(
    "DetalleCurso",
    {
      titulo: { type: DataTypes.STRING, allowNull: false },
      subtitulo: { type: DataTypes.STRING, allowNull: false },
      contenido: { type: DataTypes.TEXT, allowNull: true },
      posicion: { type: DataTypes.INTEGER, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false },
      restringido: { type: DataTypes.BOOLEAN, allowNull: false },
      restriccion: { type: DataTypes.TEXT, allowNull: true },
      videoContenido: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      timestamps: true,
      tableName: "DetallesCursos",
    }
  );
  DetalleCurso.associate = function (models) {
    DetalleCurso.belongsTo(models.Curso, {
      foreignKey: "CursoId",
    });
  };
  return DetalleCurso;
};
