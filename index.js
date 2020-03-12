const express = require('express')
const app = express()
app.use(express.json())
const _ = require("lodash");
const { Products } = require('./Models/products')
const { Category } = require('./Models/category')
const {Product_Category}=require('./Models/product_category')
const {Product_Attributes} = require('./Models/product_attribute')

app.get('/products', async (req, res) => {
    let final=[];
    if(!req.query.sort && !req.query.filter){
    const products = await Products.findAll();
    res.send(products);
    }
    else if (req.query.sort && !req.query.filter){
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
        await Product_Attributes.findAll(
            {attributes:['product_id'],where:{
                attribute_value_id:parseInt(req.query.filter)
            }}
        ).map(async e=>{
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