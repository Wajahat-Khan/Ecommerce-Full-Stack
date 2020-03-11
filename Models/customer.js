const {sequelize}=require('../shared/dbConnection')
const { DataTypes } = require("sequelize");


Customers = sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    credit_card: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    address_2: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    day_phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    eve_phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    },
    mob_phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });





module.exports={Customers}