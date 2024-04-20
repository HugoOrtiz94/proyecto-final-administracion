"use strict";

module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define(
        "Usuario",
        {
            nombres: {type: DataTypes.STRING, allowNull: false},
            apellidos: {type: DataTypes.STRING, allowNull: false},
            email: {type: DataTypes.STRING, allowNull: false},
            telefono: {type: DataTypes.STRING, allowNull: true},
            imagen: {type: DataTypes.TEXT, allowNull: true},
            activo: {type: DataTypes.BOOLEAN, allowNull: true},
            isDeleted: {type: DataTypes.BOOLEAN, allowNull: false},
            rol: {type: DataTypes.STRING, allowNull: true},
            codigoSeguridad: {type: DataTypes.STRING, allowNull: true},
            biografia: {type: DataTypes.TEXT, allowNull: true},
            fechaNacimiento: {type: DataTypes.DATE, allowNull: true},
            hash: {type: DataTypes.TEXT, allowNull: true},
            imagenDos: {type: DataTypes.TEXT, allowNull: true},
        },
        {
            timestamps: true,
            tableName: "Usuarios",
        }
    );
    Usuario.associate = function (models) {
        Usuario.hasMany(models.UsuarioCurso, {
            foreignKey: "UsuarioId",
        });
        Usuario.hasMany(models.ActividadUsuario, {
            foreignKey: "UsuarioId",
        });
    };
    return Usuario;
};
