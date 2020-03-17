"use strict";
module.exports = (sequelize, DataTypes) => {
  const attribute_value = sequelize.define(
    "AttributeValue",
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
  attribute_value.associate = function(models) {
    // associations can be defined here
  };
  return attribute_value;
};
