var express = require('express');
var router = express.Router();
const{ createOrder,addOrderedProducts,deleteOrder }= require('../controllers/ordersController');
const { checkToken } = require('../middlewares/authMiddleware');

router.post('/',checkToken, async (req, res) => {
    let order = await createOrder(req.body.customer_id, req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.region, req.body.order_date, req.body.total_price)
    res.send(order);
});

router.post('/:id',checkToken, async (req, res) => {
    const order_id = req.params.id;
   
    let order = await addOrderedProducts(order_id, req.body.product_id, req.body.size, req.body.color,
        req.body.quantity,req.body.total_price)
    res.send(order);
});

router.delete('/:id',checkToken, async (req, res) => {
    const id = req.params.id;
   
    let order = await deleteOrder(id);
    res.status(200).send({
        success: true,
        message: 'successfully deleted'
    });
});
module.exports = router;
