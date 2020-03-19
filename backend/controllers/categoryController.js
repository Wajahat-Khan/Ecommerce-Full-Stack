const _ = require("lodash");
const product = require('../models').product;
const product_categories = require('../models').product_categories;
const categories = require('../models').categories;
const { filter, prodAttributes, filteredProds } = require('./productsController');
const { Op } = require("sequelize");


prodByCategory = async (id, off, g, s, c) => {
    let temp = []
    let gender = [];
    let size = [];
    let color = [];
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
    if (s == undefined && g == undefined && c == undefined) {
        return await product.findAll({ where: { product_id: { [Op.in]: ids } } });
    }
    else {
        if (g != undefined) {
            gender = await prodAttributes(g);
        }
        if (s != undefined) {
            size = await prodAttributes(s);
        }
        if (c != undefined) {
            color = await prodAttributes(c);
        }
        let result = filter(size, color, gender);
        common = _.intersection(result, ids);

        return await filteredProds(common)

    }


}

allCategories = async () => {
    const cat = await categories.findAll();
    return cat;
}
module.exports = { prodByCategory, allCategories }