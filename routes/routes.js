const {Router} = require('express');
const router = Router();
const Container = require('../api')
// const file = '../dataBaseProducts/products.json';
let containerProducts = new Container("./products.txt");
// const myScript = '../public/main.js';
router.get('/',  async  (req, res) => {
    const products = await containerProducts.getByAll()
    res.render('index.ejs', { products ,products}, );
 }
 );
router.post("/productos", (req, res) => {
    const  products  = req.body;
    containerProducts.save(products);
    res.redirect('/')
  });

 module.exports = router;