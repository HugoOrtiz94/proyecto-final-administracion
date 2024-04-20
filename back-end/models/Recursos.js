"use strict";

module.exports = function (sequelize, DataTypes) {
  var Recurso = sequelize.define(
    "Recurso",
    {
      titulo: { type: DataTypes.STRING, allowNull: false },
      ano: { type: DataTypes.STRING, allowNull: true },
      categoria: { type: DataTypes.STRING, allowNull: true },
      autor: { type: DataTypes.STRING, allowNull: true },
      tipo: { type: DataTypes.STRING, allowNull: true },
      cover: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.TEXT, allowNull: true },
      isDeleted: {type: DataTypes.BOOLEAN, allowNull: false},

    },
    {
      timestamps: true,
      tableName: "Recursos",
    }
  );
  return Recurso;
};
