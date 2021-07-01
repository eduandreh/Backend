'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class orden extends Model {
        static associate(models) {
            // define association here
            orden.belongsTo(models.cliente);
            orden.belongsTo(models.medioDePago);
            orden.belongsTo(models.domicilio);
        }
    };
    orden.init({
        nro_orden: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        status: {
            allowNull: false,
            type: DataTypes.CHAR(1)
        }
    }, {
        sequelize,
        tableName: 'ordenes',
        modelName: 'orden',
    });
    return orden;
};