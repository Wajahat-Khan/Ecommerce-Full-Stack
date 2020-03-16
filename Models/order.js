'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    order_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};