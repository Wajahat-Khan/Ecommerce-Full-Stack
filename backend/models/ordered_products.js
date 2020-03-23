'use strict';
module.exports = (sequelize, DataTypes) => {
  const ordered_products = sequelize.define('ordered_products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "order_id"
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
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    total_price: {
      type: DataTypes.DECIMAL
    }
  },  {timestamps:false});
  ordered_products.associate = function(models) {
    // associations can be defined here
  };
  return ordered_products;
};