"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define(
    "product_attributes",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Products",
          key: "product_id"
        }
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "AttributeValues",
          key: "attribute_value_id"
        }
      }
    },
    {timestamps:false}
  );
  product_attribute.associate = function(models) {
    // associations can be defined here
  };
  return product_attribute;
};
