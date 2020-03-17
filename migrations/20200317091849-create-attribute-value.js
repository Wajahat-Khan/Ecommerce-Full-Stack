"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("attribute_values", {
      attribute_value_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "attributes",
          key: "attribute_id"
        }
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("attribute_values");
  }
};
