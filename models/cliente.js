'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class cliente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            cliente.belongsTo(models.usuarios);
        }
    };
    cliente.init({
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
        modelName: 'cliente',
    });
    return cliente;
};

