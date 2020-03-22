'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders',{
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customer",
        key: "customer_id"
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id"
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_date: { type: DataTypes.DATE, allowNull: false },
    total_price: { type: DataTypes.DECIMAL, allowNull: false }
  },
  {timestamps:false}
  
  );
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};