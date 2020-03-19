const _ = require("lodash");
const product_attributes = require('../models').product_attributes;
const product = require('../models').product;

const { Op } = require("sequelize");

// fetch all products 
allProducts = async (off) => {
    if (off == undefined) off = 1;
    off = (parseInt(off) - 1) * 10;
    pds = await product.findAll({ offset: off, limit: 10 });
    return pds;
}
// sort function
sort = (prod, sort) => {
    if (sort != undefined) {
        if (sort == "DESC") {
            return _.sortBy(prod, p => p.price).reverse();
        }
        else {
            return _.sortBy(prod, p => p.price)
        }
    }
    else {
        return _.sortBy(prod, p => p.product_id);
    }
}
// filter function
filter = (size, color, gender) => {
    temp = [];
    if (size.length == 0 && color.length == 0 && gender.length == 0) {
        temp = 0;
    }
    else if (size.length == 0 && color.length == 0 && gender.length != 0) {
        temp = gender;
    }
    else if (size.length == 0 && color.length != 0 && gender.length == 0) {
        temp = color;
    }
    else if (size.length == 0 && color.length != 0 && gender.length != 0) {
        temp = _.intersection(color, gender);
    }
    else if (size.length != 0 && color.length == 0 && gender.length == 0) {
        temp = size;
    }
    else if (size.length != 0 && color.length == 0 && gender.length != 0) {
        temp = _.intersection(size, gender);
    }
    else if (size.length != 0 && color.length != 0 && gender.length == 0) {
        temp = _.intersection(size, color);
    }
    else if (size.length != 0 && color.length != 0 && gender.length != 0) {
        temp = _.intersection(size, color, gender);
    }
    return temp;
}
filteredProds = async (ids, off) => {
    let final = [];
    if (off == undefined) { off = 1 };
    off = (parseInt(off) - 1) * 10;
    final.push(await product.findAll({ offset: off, limit: 10, where: { product_id: { [Op.in]: ids } } }));
    return final[0];
}
// Get products ids with provides attribute id
prodAttributes = async (id) => {
    let temp = []
    await product_attributes.findAll(
        {
            attributes: ['product_id'], where: {
                attribute_value_id: parseInt(id)
            }
        }
    ).map(e => {
        temp.push(e.dataValues.product_id);
    });
    return temp;
}

// product by id function
productById = async id => {
    let pd = await product.findOne({ 
        include:[{model:product_attributes}],
        where: 
        { product_id: parseInt(id) }
        
     });
    return pd;

}

search = async (query, off) => {
    let qr = '%' + query + '%';
    if (off == undefined) off = 1;
    off = (parseInt(off) - 1) * 10;
    result = await product.findAll({ offset: off, limit: 10, where: { name: { [Op.like]: qr } } });
    return result;
}
module.exports = { allProducts, sort, filter, prodAttributes, productById, search, filteredProds }