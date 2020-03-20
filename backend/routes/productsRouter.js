var express = require('express');
var router = express.Router();
const { allProducts, prodAttributes, sort, filter, productById, filteredProds } = require('../controllers/productsController')
const { checkToken } = require('../middlewares/authMiddleware');

// all products with paginations, filtering and sorting
router.get('/', async (req, res) => {
    let Gender = [];
    let Size = [];
    let Color = [];
    if (!req.query.Gender && !req.query.Size && !req.query.Color) {
        const products = await allProducts(req.query.page);
        res.send(sort(products, req.query.sort))
    }
    else {
        if (req.query.Gender != undefined) {
            Gender = await prodAttributes(req.query.Gender);
        }
        if (req.query.Size != undefined) {
            Size = await prodAttributes(req.query.Size);
        }
        if (req.query.Color != undefined) {
            Color = await prodAttributes(req.query.Color);
        }
        let result = await filter(Size, Color, Gender);
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