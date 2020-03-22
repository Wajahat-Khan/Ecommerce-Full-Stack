"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_attributes = sequelize.define(
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
          model: "attribute_values",
          key: "attribute_value_id"
        }
      }
    },
    {timestamps:false}
  );
  product_attributes.associate = function(models) {
    product_attributes.belongsTo(models.attribute_values,{ foreignKey: 'attribute_value_id'});
    };
  return product_attributes;
};
