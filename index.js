const express = require('express')
const app = express()
app.use(express.json())
const _ = require("lodash");
const { Products } = require('./Models/products')
const { Category } = require('./Models/category')
const {Product_Category}=require('./Models/product_category')

app.get('/products', async (req, res) => {
    if(!req.query.sort){
    const products = await Products.findAll();
    res.send(products);
    }
    else{
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
});

app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();
    res.send(JSON.stringify(categories));
});
app.get('/products/:id', async (req, res) => {
    const id=req.params.id;
    let final=[];
 
    await Product_Category.findAll(
        {attributes:['product_id'],where:{
            category_id:id
        }}
    ).map(async e=>{
       final.push(await Products.findOne({where:{product_id: e.dataValues.product_id}}));
           
       });
       final=_.sortBy(final,p=>p.product_id)
       res.send(final);
  
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})    