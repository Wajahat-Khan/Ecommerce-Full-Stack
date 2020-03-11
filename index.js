const express = require('express')
const app = express()
app.use(express.json())
const _ = require("lodash");
const { Products } = require('./Models/products')
const { Category } = require('./Models/category')
const {Product_Category}=require('./Models/product_category')

app.get('/products', async (req, res) => {
    const products = await Products.findAll();
    res.send(JSON.stringify(products));
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
       res.send(final)
    ;
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})    