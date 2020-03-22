var express = require('express');
var router = express.Router();
const { prodByCategory } = require('../controllers/categoryController')
const { sort } = require('../controllers/productsController');

// products by category
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    prods = await prodByCategory(id, req.query.page, req.query.Gender, req.query.Size, req.query.Color);
    res.send(sort(prods, req.query.Sort));
});

module.exports = router;  