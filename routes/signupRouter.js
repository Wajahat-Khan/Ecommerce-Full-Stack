var express = require('express');
var router = express.Router();
const { createUser } = require('../controllers/authenticaion');

router.post('/', async (req, res) => {
    const user = await createUser(req.body);
    res.send(user);

})


module.exports = router; 