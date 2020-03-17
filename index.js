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



// product by id function
productById= async id=>{
    let pd=await product.findOne({where:{product_id:parseInt(id)}});
    return pd;
    
 }

 // fetch all products 
allProducts=  async ()=>{
     let pds=await product.findAll();
     return pds;  
  }
 // sort function
sort =(prod, sort)=>{
     if (sort !== undefined){
     if (sort =="DESC"){
         return _.sortBy(prod, p => p.price).reverse();
     }
     else 
     {
         console.log(sort)
         return _.sortBy(prod, p => p.price)
     }
 }
 else {
     return _.sortBy(prod, p => p.product_id);
 }
 }
 
 // filter function
filter=(size,color,gender)=>{
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
 
prodAttributes= async (id) =>{
    let temp=[]
    await product_attributes.findAll(
        {
            attributes: ['product_id'], where: {
                attribute_value_id: parseInt(id)
            }
        }
    ).map(e => {
        
        temp.push(e.dataValues.product_id);
    });
    return temp;
}
prodByCategory = async (id) =>{
    let temp=[]
    await product_categories.findAll(
        {
            attributes: ['product_id'], where: {
                category_id: parseInt(id)
            }
        }
    ).map(async e => {
        temp.push(await product.findOne({ where: { product_id: e.dataValues.product_id } }));
    });
    return temp;
}
// Sign up api
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

// Log in api
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

        }).catch(e=>{
            res.status(400).send({
                success: false,
                message: 'User not found'
            });
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

// products and filer api
app.get('/products', async (req, res) => {
   let gender=[];
   let size=[];
   let color=[];
   let final = [];
    if (!req.query.gender && !req.query.size && !req.query.color) {
        const products = await allProducts();
        res.send(sort(products,req.query.sort))
    }
    else {
        if (req.query.gender != undefined) {
           gender=await prodAttributes(req.query.gender);
        }
        if (req.query.size != undefined) {
            size= await prodAttributes(req.query.size);
        }
        if (req.query.color != undefined) {
            color=await prodAttributes(req.query.color);   
        }
        let result=filter(size,color,gender);
        final.push(await product.findAll({ where: {  product_id: {[Op.in]: result} } }));
        res.send(sort(final[0],req.query.sort))
    }
});

// product by id
app.get('/products/:id', async(req,res)=>{
    let pd= await  productById(req.params.id)
    res.send(pd);
});

// products by category
app.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    prods=await prodByCategory(id);
    res.send(sort(prods,req.query.sort));
});

// 




const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})    