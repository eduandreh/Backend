'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class producto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    producto.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        titulo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        tag: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        precio: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        imageFileName: {
            allowNull: false,
            type: DataTypes.STRING(50)
        }

    }, {
        sequelize,
        modelName: 'producto',
    });
    return producto;
};