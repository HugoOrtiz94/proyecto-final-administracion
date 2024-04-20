"use strict";

module.exports = function(sequelize, DataTypes) {
    var ActividadUsuario = sequelize.define("ActividadUsuario",
        {
            tipo:                       { type: DataTypes.STRING,           allowNull: false },
            nombre:                     { type: DataTypes.STRING,           allowNull: false },
            indicaciones:               { type: DataTypes.TEXT,             allowNull: false },
            fechaInicia:                { type: DataTypes.DATE,             allowNull: true  },
            fechaFinaliza:              { type: DataTypes.DATE,             allowNull: true  },
            isDeleted:                  { type: DataTypes.BOOLEAN,          allowNull: false },
            activo:                     { type: DataTypes.BOOLEAN,          allowNull: false },
            valor:                      { type: DataTypes.INTEGER,          allowNull: false },
            contenido:                  { type: DataTypes.TEXT,             allowNull: false },
            restringido:                { type: DataTypes.BOOLEAN,          allowNull: false },
            restriccion:                { type: DataTypes.TEXT,             allowNull: true  },
        },
        {
            timestamps: true,
            tableName: 'ActividadesUsuarios'
        }
    );
    ActividadUsuario.associate = function(models) {
        ActividadUsuario.belongsTo(
            models.Usuario,
            {
                foreignKey: 'UsuarioId'
            }
        );
        ActividadUsuario.belongsTo(
            models.Curso,
            {
                foreignKey: 'CursoId'
            }
        );
        ActividadUsuario.belongsTo(
            models.ActividadCurso,
            {
                foreignKey: 'ActividadCursoId'
            }
        );
    };
    return ActividadUsuario;
};
