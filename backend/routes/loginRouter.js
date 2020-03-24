var express = require('express');
var router = express.Router();
const { validate } = require('../controllers/authenticaion');

// Log in api
router.post('/', async (req, res) => {

    if (req.body.email && req.body.password) {
        const val = await validate(req.body);
        if (val.success === false) {
            res.status(404).send(val);
        } else {
            res.send(val);
        }
    }
    else {
        res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}
)
module.exports = router;