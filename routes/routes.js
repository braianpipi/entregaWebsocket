const {Router} = require('express');
const routes = Router();
const Container = require('../api')
let containerProducts = new Container("./products.txt");
const myScript = '../public/main.js';


routes.get('/',  async  (req, res) => {
    const products = await containerProducts.getByAll()
    res.render('index.ejs', { products : products});
 }
 );
routes.post("/productos", (req, res) => {
    const  products  = req.body;
    containerProducts.save(products);
    res.redirect('/')
  });

 module.exports = routes;