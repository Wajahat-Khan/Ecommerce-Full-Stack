"use strict";
module.exports = (sequelize, DataTypes) => {
  const attribute_values = sequelize.define(
    "attribute_values",
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Attributes',
          key: 'attribute_id'
        }
      },
      value: { type: DataTypes.STRING, allowNull: false }
    },
    {timestamps:false}
  );
  attribute_values.associate = function(models) {
 
  };
  return attribute_values;
};
