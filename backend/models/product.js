"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      discounted_price: { type: DataTypes.DECIMAL, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      image_2: { type: DataTypes.STRING, allowNull: false },
      thumbnail: { type: DataTypes.STRING, allowNull: false },
      display: { type: DataTypes.INTEGER, allowNull: false }
    },
    {timestamps:false}
  );
  product.associate = function(models) {
    product.hasMany(models.product_attributes,{ foreignKey: 'product_id'});
  };
  return product;
};
