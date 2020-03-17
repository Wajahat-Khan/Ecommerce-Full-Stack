const express = require('express')
const app = express()
app.use(express.json())
const _ = require("lodash");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

const product_categories = require('./models').product_categories;
const product_attributes = require('./models').product_attributes;
const { sequelize } = require('./shared/dbConnection')
const customer = require('./models').customer;
const product = require('./models').product;
const category = require('./models').category;


// JWT implementation
const { secret } = require('./config.js')
const { checkToken } = require('./middleware.js')
let jwt = require('jsonwebtoken');

// ecnryption
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/signup', (req, res) => {
    customer.create({
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        password: cryptr.encrypt(`${req.body.password}`)
    }).then(newUser => {
        res.send(newUser);
    }).catch(err => {
        console.log(err);
    })

})


app.post('/login', async (req, res) => {

    if (req.body.username && req.body.password) {
        customer.findOne({
            attributes: ['password'], where: {
                name: req.body.username
            }
        }).then(p => {
            const pass = cryptr.decrypt(p.password);
            if (pass === req.body.password) {
                let token = jwt.sign({ username: req.body.username },
                    secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }

        });
    }
    else {
        res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}
)

app.get('/products', async (req, res) => {
   
   let gender=[];
   let size=[];
   let color=[];
   let final = [];
    if (!req.query.sort && !req.query.gender && !req.query.size && !req.query.color) {
        const products = await product.findAll();
        res.send(products);
    }
    else if (req.query.sort && !req.query.gender && !req.query.size && !req.query.color) {
        if (req.query.sort === "DESC") {
            const products = await product.findAll({
                order: [['price', 'DESC']]
            });
            res.send(products);
        } else {
            const products = await product.findAll({
                order: [['price']]
            });
            res.send(products);
        }
    }
    else {
        if (req.query.gender) {
           await product_attributes.findAll(
                {
                    attributes: ['product_id'], where: {
                        attribute_value_id: parseInt(req.query.gender)
                    }
                }
            ).map(e => {
                
                gender.push(e.dataValues.product_id);
            });
        }
        if (req.query.size) {
            await product_attributes.findAll(
                {
                    attributes: ['product_id'], where: {
                        attribute_value_id: parseInt(req.query.size)
                    }
                }
            ).map(e => {
                size.push(e.dataValues.product_id);
            });
        }
        if (req.query.color) {
           await product_attributes.findAll(
                {
                    attributes: ['product_id'], where: {
                        attribute_value_id: parseInt(req.query.color)
                    }
                }
            ).map(e => {
                color.push(e.dataValues.product_id);
            });
        }
         let result=filter(size,color,gender);
        final.push(await product.findAll({ where: {  product_id: {[Op.in]: result} } }));
        res.send(sort(final[0],req.query.sort))
    }
});

function sort(prod, sort){
    if (sort!==null){
        console.log("o yeah")
    if (sort =="DESC"){
        console.log("coming DES")
        return _.sortBy(prod, p => p.price).reverse();
    }
    else 
    {
        return _.sortBy(prod, p => p.price)
    }
}
else {
    return _.sortBy(prod, p => p.product_id);
}
}
function filter(size,color,gender){
    if(size.length==0 && color.length==0 && gender.length==0){
        return 0;
    }
    else  if(size.length==0 && color.length==0 && gender.length!=0){
        console.log(gender)
        return gender;
    }
    else  if(size.length==0 && color.length!=0 && gender.length==0){
        return color;
    }
    else  if(size.length==0 && color.length!=0 && gender.length!=0){
        return _.intersection(color, gender);
    }
    else  if(size.length!=0 && color.length==0 && gender.length==0){
        return size;
    }
    else  if(size.length!=0 && color.length==0 && gender.length!=0){
        return _.intersection(size, gender);
    }
    else  if(size.length!=0 && color.length!=0 && gender.length==0){
        return _.intersection(size, color);
    }
    else  if(size.length!=0 && color.length!=0 && gender.length!=0){
        return _.intersection(size, color, gender);
    }
}
app.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    let final = [];
    if (!req.query.sort) {
        await product_categories.findAll(
            {
                attributes: ['product_id'], where: {
                    category_id: id
                }
            }
        ).map(async e => {
            final.push(await product.findOne({ where: { product_id: e.dataValues.product_id } }));

        });
        final = _.sortBy(final, p => p.product_id)
        res.send(final);
    }
    else {
        if (req.query.sort === "DESC") {
            await product_categories.findAll(
                {
                    attributes: ['product_id'], where: {
                        category_id: id
                    }
                }
            ).map(async e => {
                final.push(await product.findOne({ where: { product_id: e.dataValues.product_id }, order: [['price', 'DESC']] }));

            });
            final = _.sortBy(final, p => p.price).reverse();
            res.send(final);
        }
        else {
            await product_categories.findAll(
                {
                    attributes: ['product_id'], where: {
                        category_id: id
                    }
                }
            ).map(async e => {
                final.push(await product.findOne({ where: { product_id: e.dataValues.product_id }, order: [['price']] }));

            });
            final = _.sortBy(final, p => p.price)
            res.send(final);
        }

    }

});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})    