"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
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
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};
