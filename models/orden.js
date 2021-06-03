'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orden.belongsTo(models.usuarios,
				{
					as: 'usuario',
					foreignKey: 'cliente_fullname'
				}
			);
    }
  };
  orden.init({

    nro_orden: {
			allowNull: false,
			type: DataTypes.INTEGER
		},  

    cliente_fullname: {
			allowNull: false,
			type: DataTypes.STRING
		},
    
    fecha: {
			allowNull: false,
			type: DataTypes.DATE,
      //defaultValue: sequelize.literal("(now() at time zone 'utc')")
		},
    status: {
			allowNull: false,
			type: DataTypes.CHAR
		}
    
   
  }, {
    sequelize,
    modelName: 'orden',
  });
  return orden;
};