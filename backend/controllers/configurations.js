const { allProducts } = require('./productsController');
const attributes = require('../models').attributes;
const attribute_values = require('../models').attribute_values;
const { allCategories } = require('./categoryController');
configurations = async () => {
    const products = await allProducts(1);
    const attr = await attributes.findAll({include:[{model:attribute_values}]});
    const attr_values = await attribute_values.findAll();
    const categories = await allCategories();
    return {
        "products": products,
        "attributes": attr,
        "attributes_values": attr_values,
        "categories": categories
    }
}

module.exports = { configurations }