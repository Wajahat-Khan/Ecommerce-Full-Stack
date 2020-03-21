const _ = require("lodash");
const product = require('../models').product;
const product_categories = require('../models').product_categories;
const categories = require('../models').categories;
const { filter, prodAttributes, filteredProds } = require('./productsController');
const { Op } = require("sequelize");


prodByCategory = async (id, off, gender, size, color) => {
    let temp = []
    let _gender = [];
    let _size = [];
    let _color = [];
    ids = [];
    if (off == undefined) { off = 1 };
    off = (parseInt(off) - 1) * 10;

    prod_ids = await product_categories.findAll(
        {
            offset: off, limit: 10,
            attributes: ['product_id'], where: {
                category_id: parseInt(id)
            }
        }
    );
    prod_ids.map(e => {
        ids.push(e.dataValues.product_id);
    })
    if (size == undefined && gender == undefined && color == undefined) {
        return await product.findAll({ where: { product_id: { [Op.in]: ids } } });
    }
    else {
        if (gender != undefined) {
            _gender = await prodAttributes(gender);
        }
        if (size != undefined) {
            _size = await prodAttributes(size);
        }
        if (color != undefined) {
            _color = await prodAttributes(color);
        }
        let result = filter(_size, _color, _gender);
        common = _.intersection(result, ids);

        return await filteredProds(common)

    }


}

allCategories = async () => {
    const cat = await categories.findAll();
    return cat;
}
module.exports = { prodByCategory, allCategories }
