var express = require('express');
var router = express.Router();
const{ addOrder}= require('../controllers/ordersController');

router.post('/', async (req, res) => {
    let order = await addOrder(req.params.customer_id, req.params.product_id, req.params.size, req.params.color, req.params.quantity, req.params.order_date, req.params.total_price)
    res.send(order);
});

module.exports = router;
