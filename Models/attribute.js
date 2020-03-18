"use strict";
module.exports = (sequelize, DataTypes) => {
  const attributes = sequelize.define(
    "attributes",
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
  attributes.associate = function(models) {
    // associations can be defined here
  };
  return attributes;
};
