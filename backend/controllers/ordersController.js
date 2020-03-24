const orders = require('../models').orders;
const ordered_products = require('../models').ordered_products;

createOrder = async (customer_id,first_name,last_name,address,city,state,zip_code,region, order_date, total_price) => {
    const order = await orders.create({
        customer_id,first_name,last_name,address,city,state,zip_code,region, order_date, total_price
    })
    return order;
}

addOrderedProducts = async (order_id, product_id, size, color, quantity,total_price) => {
    const order = await ordered_products.create({
        order_id, product_id, size, color, quantity,total_price
    })
    return order;
}

module.exports = { createOrder, addOrderedProducts }