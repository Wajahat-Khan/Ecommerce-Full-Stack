'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "customer_id"
        }
      },
      first_name:{
        type:Sequelize.STRING
      },
      last_name:{
        type:Sequelize.STRING
      },
      address:{
        type:Sequelize.STRING
      },
      city:{
        type:Sequelize.STRING
      },
      state:{
        type:Sequelize.STRING
      },
      zip_code:{
        type:Sequelize.STRING
      },
      region:{
        type:Sequelize.STRING
      },
      order_date: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.DECIMAL
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};