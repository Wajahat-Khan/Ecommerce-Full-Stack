'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id"
      }
    },
    order_date: {
      type: DataTypes.DATE
    },
    total_price: {
      type: DataTypes.DECIMAL
    }
  },  {timestamps:false});
  orders.associate = function(models) {
    orders.hasMany(models.ordered_products,{ foreignKey: 'order_id'});
  };
  return orders;
};