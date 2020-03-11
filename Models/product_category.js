const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Product_Category = sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Product_Category}