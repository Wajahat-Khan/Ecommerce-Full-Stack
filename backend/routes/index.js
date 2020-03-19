var express = require('express');
var router = express.Router();
const { configurations } = require('../controllers/configurations');
const { search } = require('../controllers/productsController');

/* Landing Page*/
router.get('/', async (req, res) => {
  if (req.query.q != undefined) {
    const prod = await search(req.query.q, req.query.page);
    res.send(prod);
  }
  else {
    const configs = await configurations();
    res.send(configs);
  }
});

module.exports = router;
