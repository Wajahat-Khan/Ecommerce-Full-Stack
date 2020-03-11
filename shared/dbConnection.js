require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.USER_NAME}`, `${process.env.PASSWORD}`, {
    host: `${process.env.CONNECTION_STRING}`,
    dialect: 'postgres',
    define:{
      timestamps: false
    }
  
    });
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
    module.exports={sequelize}