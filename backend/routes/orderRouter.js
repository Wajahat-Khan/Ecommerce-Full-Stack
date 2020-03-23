var express = require('express');
var router = express.Router();
const{ createOrder,addOrderedProducts }= require('../controllers/ordersController');

router.post('/', async (req, res) => {
    let order = await createOrder(req.body.customer_id, req.body.order_date, req.body.total_price)
    res.send(order);
});
router.post('/:id', async (req, res) => {
    const order_id = req.params.id;
    let order = await addOrderedProducts(order_id, req.body.product_id, req.body.size, req.body.color,
        req.body.quantity,req.body.total_price)
    res.send(order);
});
module.exports = router;
