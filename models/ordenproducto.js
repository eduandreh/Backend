'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ordenProducto extends Model {
        static associate(models) {
            models.producto.belongsToMany(models.orden, { through: ordenProducto});
            models.orden.belongsToMany(models.producto, { through: ordenProducto});
        }
    };
    ordenProducto.init({
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'ordenProducto',
        modelName: 'ordenProducto',
        timestamps: false
    });
    return ordenProducto;
};