const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Departments = sequelize.define('department', {
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Departments}