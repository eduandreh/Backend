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
        tarjeta: {
            allowNull: false,
            type: DataTypes.STRING(15),
        },
        numero: {
            allowNull: false,
            type: DataTypes.STRING(16),
        },
        cvv: {
            allowNull: false,
            type: DataTypes.STRING(3),
        },
        expiry: {
            allowNull: false,
            type: DataTypes.STRING(4),
        },
        titular: {
            allowNull: false,
            type: DataTypes.STRING(75),
        },

    }, {
        sequelize,
        modelName: 'medioDePago',
    });
    return medioDePago;
};

