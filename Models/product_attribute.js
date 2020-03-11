const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Product_Attributes = sequelize.define('product_attribute', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Product_Attributes}