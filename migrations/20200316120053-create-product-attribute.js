'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_attributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      attribute_value_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{timestamps: false}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_attributes');
  }
};