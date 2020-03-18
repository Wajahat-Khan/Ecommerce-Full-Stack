"use strict";
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define(
    "Attribute",
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false }
    },
    {timestamps:false}
  );
  attribute.associate = function(models) {
    // associations can be defined here
  };
  return attribute;
};
