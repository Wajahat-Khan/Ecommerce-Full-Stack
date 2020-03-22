const orders = require('../models').orders;


addOrder = async (customer_id, product_id, size, color, quantity, order_date, total_price) => {
    const order = await orders.create({
        customer_id, product_id, size, color, quantity, order_date, total_price
    })
    return order;
}

module.exports = { addOrder }