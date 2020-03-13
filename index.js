const express = require('express')
const app = express()
app.use(express.json())
const _ = require("lodash");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');


const { Products } = require('./Models/products')
const { Category } = require('./Models/category')
const {Product_Category}=require('./Models/product_category')
const {Product_Attributes} = require('./Models/product_attribute')
const {sequelize}=require('./shared/dbConnection')
const{Customers}=require('./Models/customer')

// JWT implementation
const {secret}=require('./config.js')
const {checkToken}= require('./middleware.js')
let jwt = require('jsonwebtoken');


let username="wajahat";
let pass="hello";

app.post('/login', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        if (username === "wajahat" && password === "wajahat") {
          let token = jwt.sign({username: username},
            secret,
            { expiresIn: '24h' // expires in 24 hours
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
      } else {
        res.status(400).send({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
)


app.post('/signup', (req,res)=>{
        Customers.create({
            name: `${req.body.name}`,
            email: `${req.body.email}`,
            password: `${req.body.password}`
        }).then(newUser=>{
            res.send(newUser);
        }).catch(err=>{
            console.log(err);
        })
       
})







app.get('/products',checkToken, async (req, res) => {
    let final=[];
    if(!req.query.sort && !req.query.gender && !req.query.size && !req.query.color){
    const products = await Products.findAll();
    res.send(products);
    }
    else if (req.query.sort && !req.query.gender && !req.query.size && !req.query.color){
        if(req.query.sort==="DESC"){
        const products = await Products.findAll({
            order:[['price','DESC']]
        });
        res.send(products);
    }else{
        const products = await Products.findAll({
            order:[['price']]
        });
        res.send(products);
    }
    }
    else {
        let f1=parseInt(req.query.gender)
        let f2=parseInt(req.query.size);
        let f3=parseInt(req.query.color);
        let query='SELECT a.product_id FROM product_attribute AS a JOIN product_attribute AS b ON a.product_id=b.product_id JOIN product_attribute AS c ON b.product_id=c.product_id WHERE a.attribute_value_id = 1 AND b.attribute_value_id = 1 AND c.attribute_value_id = 16'
        let res= await sequelize.query(query,{ type: QueryTypes.SELECT }).map(async e=>{
           final.push(await Products.findOne({where:{product_id: e.dataValues.product_id}}));     
           });
           if(req.query.sort){
               if(req.query.sort==="DESC")
                final=_.sortBy(final,p=>p.price).reverse();
                else
                final=_.sortBy(final,p=>p.price)
                res.send(final)
           }else{
           final=_.sortBy(final,p=>p.product_id)
           res.send(final)
           }
        }
});


app.get('/category/:id', async (req, res) => {
    const id=req.params.id;
    let final=[];
    if(!req.query.sort){
    await Product_Category.findAll(
        {attributes:['product_id'],where:{
            category_id:id
        }}
    ).map(async e=>{
       final.push(await Products.findOne({where:{product_id: e.dataValues.product_id}}));
           
       });
    final=_.sortBy(final,p=>p.product_id)
    res.send(final);
    }
    else{
        if(req.query.sort==="DESC"){
            await Product_Category.findAll(
                {attributes:['product_id'],where:{
                    category_id:id
                }}
            ).map(async e=>{
               final.push(await Products.findOne({where:{product_id: e.dataValues.product_id}, order:[['price','DESC']]}));
                   
               });
        final=_.sortBy(final,p=>p.price).reverse();
        res.send(final);
        }
        else{
            await Product_Category.findAll(
                {attributes:['product_id'],where:{
                    category_id:id
                }}
            ).map(async e=>{
               final.push(await Products.findOne({where:{product_id: e.dataValues.product_id},order:[['price']]}));
                   
               });
               final=_.sortBy(final,p=>p.price)
               res.send(final);
            }
       
    }
    
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})    