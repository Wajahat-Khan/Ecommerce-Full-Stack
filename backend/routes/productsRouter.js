var express = require('express');
var router = express.Router();
const { allProducts, prodAttributes, sort, filter, productById, filteredProds } = require('../controllers/productsController')
const { checkToken } = require('../middlewares/authMiddleware');

// all products with paginations, filtering and sorting
router.get('/', async (req, res) => {
    let gender = [];
    let size = [];
    let color = [];
    if (!req.query.gender && !req.query.size && !req.query.color) {
        const products = await allProducts(req.query.page);
        res.send(sort(products, req.query.sort))
    }
    else {
        if (req.query.gender != undefined) {
            gender = await prodAttributes(req.query.gender);
        }
        if (req.query.size != undefined) {
            size = await prodAttributes(req.query.size);
        }
        if (req.query.color != undefined) {
            color = await prodAttributes(req.query.color);
        }
        let result = await filter(size, color, gender);
        final = await filteredProds(result, req.query.page)
        res.send(sort(final, req.query.sort))
    }
});

// product by id
router.get('/:id', async (req, res) => {
    let pd = await productById(req.params.id)
    res.send(pd);
});


module.exports = router;  