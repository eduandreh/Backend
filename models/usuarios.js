'use strict';
const {
  Model
} = require('sequelize');
const usuarios = require('../controllers/usuarios');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuarios.init({
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
    fullname:{
      allowNull: false,
      type: DataTypes.STRING,
  },
    email:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    admin: {
			allowNull: true,
			defaultValue: false,
			type: DataTypes.BOOLEAN
		}
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};

