"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_categories = sequelize.define(
    "product_categories",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Products",
          key: "product_id"
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categorys",
          key: "category_id"
        }
      }
    },
    {timestamps:false}
  );
  product_categories.associate = function(models) {
    // associations can be defined here
  };
  return product_categories;
};
