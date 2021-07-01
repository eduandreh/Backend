'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class medioDePago extends Model {

        static associate(models) {
            // define association here
            medioDePago.belongsTo(models.cliente,
                {
                    as: 'cliente'
                }
            );
        }
    };
    medioDePago.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ubicacion: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        telefono: {
            allowNull: false,
            type: DataTypes.INTEGER
        },

    }, {
        sequelize,
        modelName: 'medioDePago',
    });
    return medioDePago;
};

