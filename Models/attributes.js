const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Attributes = sequelize.define('attribute', {
    attribute_id: {
      type: DataTypes.INTEGER ,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100)
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Attributes}