var express = require('express');
var router = express.Router();
const{ addOrder}= require('../controllers/ordersController');

router.post('/', async (req, res) => {
    let order = await addOrder(req.body.customer_id, req.body.product_id, req.body.size, req.body.color, req.body.quantity, req.body.order_date, req.body.total_price)
    res.send(order);
});

module.exports = router;
