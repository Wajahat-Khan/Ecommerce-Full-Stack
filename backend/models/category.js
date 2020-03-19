"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departments",
          key: "department_id"
        }
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING
    },
    {timestamps:false}
  );
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};
