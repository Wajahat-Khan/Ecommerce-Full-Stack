"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    "customer",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      credit_card: { type: DataTypes.TEXT, allowNull: true },
      address_1: { type: DataTypes.STRING, allowNull: true },
      address_2: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      region: { type: DataTypes.STRING, allowNull: true },
      postal_code: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      shipping_region_id: { type: DataTypes.INTEGER, allowNull: true },
      mob_phone: { type: DataTypes.STRING, allowNull: true }
    },
    {timestamps:false}
  );
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};
