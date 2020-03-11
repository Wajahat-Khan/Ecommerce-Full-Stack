const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Attribute_Value = sequelize.define('attribute_value', {
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Attribute_Value}