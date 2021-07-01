'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class domicilio extends Model {

        static associate(models) {
            // define association here
            domicilio.belongsTo(models.cliente);
        }
    };
    domicilio.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING(60),
        },
        apellido: {
            allowNull: false,
            type: DataTypes.STRING(60),
        },
        direccion: {
            allowNull: false,
            type: DataTypes.STRING(180),
        },
        ciudad: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        provincia: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        zipcode: {
            allowNull: false,
            type: DataTypes.STRING(10),
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        cellphone: {
            allowNull: false,
            type: DataTypes.STRING(15),
        },

    }, {
        sequelize,
        modelName: 'domicilio',
    });
    return domicilio;
};

