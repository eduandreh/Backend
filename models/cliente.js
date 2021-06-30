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
            cliente.belongsTo(models.usuarios,
                {
                    as: 'usuario',
                    foreignKey: 'usuario_fullname'
                }
            );
        }
    };
    cliente.init({
        usuario_fullname: {
            allowNull: false,
            type: DataTypes.STRING
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

